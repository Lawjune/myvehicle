export const types = [
  {
    _id: "5b21ca3eeb7f6fbccd471818",
    name: "attribute",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471814",
    name: "sensor",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471820",
    name: "actuator",
  },
];

export function getTypes() {
  return types.filter((t) => t);
}
