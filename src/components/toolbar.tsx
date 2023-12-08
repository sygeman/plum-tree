import { Switch } from "@mantine/core";
import { EyeOpenIcon } from "@radix-ui/react-icons";

export const Toolbar = ({ readonly, setReadonly, tree }) => {
  return (
    <div className="items-center absolute space-x-2 flex top-2 left-2 backdrop-blur bg-black/30 px-4 py-2 rounded-lg text-white">
      <div>{tree?.title}</div>
      {/* <Switch
        defaultChecked={readonly}
        offLabel={<EyeOpenIcon />}
        onChange={(event) => setReadonly(event.currentTarget.checked)}
        onLabel={<Pencil1Icon />}
      /> */}
    </div>
  );
};
