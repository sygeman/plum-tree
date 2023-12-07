import { Button, Group, MultiSelect, Radio } from "@mantine/core";
import get from "lodash.get";
import { useEffect, useState } from "react";

export const PartnerRow = ({ index, onChange, onRemove, partner, people }) => {
  const [type, setType] = useState(get(partner, "type", "PARTNER"));
  const [partners, setPartners] = useState(
    get(partner, "people", []).map((p) => p._id)
  );

  useEffect(() => {
    onChange(index, { partners, type });
  }, [type, partners, onChange, index]);

  return (
    <div className="my-4">
      <MultiSelect
        data={people}
        label="Partner Sim(s)"
        onChange={setPartners}
        value={partners}
      />

      <Radio.Group label="Partner Type" onChange={setType} value={type}>
        <Group>
          <Radio label="Partner" value="PARTNER" />
          <Radio label="Ex-Partner" value="EX_PARTNER" />
          <Radio label="Married" value="MARRIED" />
          <Radio label="Abduction" value="ABDUCTION" />
        </Group>
      </Radio.Group>

      <Button className="mt-4" onClick={onRemove} variant="default">
        Remove Partner
      </Button>
    </div>
  );
};
