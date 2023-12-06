import axios from "axios";
import get from "lodash.get";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ToolbarDropdown } from "./toolbar-dropdown";

export const TreeToolbar = ({
  saveTree: onSaveTree,
  setPreviewMode: onPreviewModeChange,
  tree,
}) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    closeMenus();

    // Close all toolbar menus when window is resized. Prevents switching to
    // mobile view and back with unexpected open menus.
    window.addEventListener("resize", closeMenus);

    return () => {
      window.removeEventListener("resize", closeMenus);
    };
  }, []);

  useEffect(() => {
    onPreviewModeChange && onPreviewModeChange(previewMode);
  }, [previewMode]);

  function handleTogglePreview() {
    setPreviewMode(!previewMode);
  }

  function closeMenus() {
    setMobileMenuOpen(false);
  }

  function saveTree() {
    closeMenus();
    onSaveTree && onSaveTree(tree, true);
  }

  function deleteTree() {
    closeMenus();

    const deleteConfirmed = confirm(
      "Are you sure you want to delete this tree?"
    );

    if (deleteConfirmed) {
      axios.delete(`/api/trees/${get(tree, "_id")}`).then(() => {
        // quickest way to go to homepage and reload trees for side nav is to
        // simply reload the page and going to homepage.
        window.location.href = "/";
      });
    }
  }

  const burgerClassNames = ["styles.hamburger"];
  const mobileMenuClassNames = ["styles.menuMobile"];

  if (mobileMenuOpen) {
    burgerClassNames.push("styles.hamburgerActive");
    mobileMenuClassNames.push("styles.menuMobileActive");
  }

  const ACTION_MENU_ITEMS = [
    {
      id: "actions-dropdown-save",
      label: "Save Tree",
      onClick: saveTree,
    },
    {
      id: "actions-dropdown-publish",
      label: "Publish Tree",
      link: `/trees/${get(tree, "_id")}/publish`,
      onClick: closeMenus,
    },
    {
      id: "actions-dropdown-delete",
      label: "Delete Tree",
      onClick: deleteTree,
    },
    {
      id: "download-tree",
      label: "Download Tree",
      link: `/trees/${get(tree, "_id")}/download`,
      onClick: closeMenus,
    },
  ];

  const EDIT_MENU_ITEMS = [
    {
      id: "edit-dropdown-tree-details",
      label: "Tree Details",
      link: `/trees/${get(tree, "_id")}/details`,
      onClick: closeMenus,
    },
    {
      id: "edit-dropdown-people",
      label: "People in Tree",
      link: `/trees/${get(tree, "_id")}/people`,
      onClick: closeMenus,
    },
  ];

  return (
    <div>
      {/* Desktop Menu */}
      <div className="hidden-xs-down">
        <div className={"styles.toolbar"}>
          <span className={"styles.toolbarTitle"}>Tree Editor</span>
          <ToolbarDropdown
            id="actions-dropdown"
            items={ACTION_MENU_ITEMS}
            label="Actions"
          />
          <ToolbarDropdown
            id="edit-dropdown"
            items={EDIT_MENU_ITEMS}
            label="Edit"
          />
          <input
            checked={previewMode}
            onChange={handleTogglePreview}
            type="checkbox"
          />
          <label
            className={["styles.toolbarItem", "checkbox"].join(" ")}
            onClick={handleTogglePreview}
          >
            <span /> Preview
          </label>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className="hidden-sm-up">
        <div
          className={"styles.toolbarMobile"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={"styles.toolbarTitle"}>Tree Editor</span>

          <div className={"styles.menuButton"}>
            <i className={burgerClassNames.join(" ")}>
              <div />
              <div />
              <div />
            </i>
          </div>
        </div>

        <div className={mobileMenuClassNames.join(" ")}>
          <ul>
            <div className={"styles.mobileMenuHeading"}>Actions</div>
            {ACTION_MENU_ITEMS.map((menuItem, index) => {
              return (
                <li key={index}>
                  {menuItem.link ? (
                    <Link onClick={() => menuItem.onClick()} to={menuItem.link}>
                      {menuItem.label}
                    </Link>
                  ) : (
                    <div onClick={() => menuItem.onClick()}>
                      {menuItem.label}
                    </div>
                  )}
                </li>
              );
            })}
            <div className={"styles.mobileMenuHeading"}>Edit</div>
            {EDIT_MENU_ITEMS.map((menuItem, index) => {
              return (
                <li key={index}>
                  {menuItem.link ? (
                    <Link onClick={() => menuItem.onClick()} to={menuItem.link}>
                      {menuItem.label}
                    </Link>
                  ) : (
                    <div onClick={() => menuItem.onClick()}>
                      {menuItem.label}
                    </div>
                  )}
                </li>
              );
            })}
            <div className={"styles.mobileMenuHeading"}>Preview</div>
            <input
              checked={previewMode}
              onChange={handleTogglePreview}
              type="checkbox"
            />
            <label
              className={[styles.toolbarItem, "checkbox"].join(" ")}
              onClick={handleTogglePreview}
            >
              <span /> Preview
            </label>
          </ul>
        </div>
      </div>
    </div>
  );
};
