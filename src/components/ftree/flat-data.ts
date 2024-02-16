import { Data, PeopleExtended } from "./types";

export const flatData = (data: Data) => {
  const people = new Map<string, PeopleExtended>();

  data.people.forEach((p) =>
    people.set(p.id, {
      ...p,
      childen: new Set(),
      parents: new Set(),
      partners: new Set(),
    })
  );

  const stack = [structuredClone(data.tree)];

  for (const { children, partners, person } of stack) {
    partners?.forEach((partner) => {
      partner.people?.forEach((p) => {
        const partnerLink = people.get(p);
        if (partnerLink) {
          people.get(person)?.partners.add({
            id: p,
            partner: partnerLink,
            type: partner.type,
          });
        }
      });
    });

    if (!children) continue;

    children.forEach((c) => {
      people.get(person)?.childen.add({ id: c.person });
      people.get(c.person)?.parents.add({ id: person });
    });

    children.forEach((c) => stack.push(c));
  }

  return people;
};
