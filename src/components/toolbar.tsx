import { preview, tree } from "@/state";
import { Switch } from "@mantine/core";
import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";

export const Toolbar = () => (
  <div
    className={`items-center absolute space-x-2 flex top-2 left-2 backdrop-blur 
    px-4 py-2 rounded-lg text-white bg-black/30`}
  >
    <div>{tree.value.title}</div>
    <Switch
      defaultChecked={preview.value}
      offLabel={<Pencil1Icon />}
      onChange={(event) => (preview.value = event.currentTarget.checked)}
      onLabel={<EyeOpenIcon />}
    />
  </div>
);
