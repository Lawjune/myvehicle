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

export function getTypeId(type) {
  const { _id } = types.find((t) => t.name === type);
  return _id;
}

const dataTypes = [
  { _id: "204c3bbd-d28f-4b3d-a131-1f4a54a1f33f", name: "uint32" },
  { _id: "b8161681-c7c7-4f4c-a574-3f01f1da4e5c", name: "string" },
  { _id: "fef157e4-039a-48b4-ae0e-fccca445f881", name: "uint16" },
  { _id: "3a18e8c5-3d48-4299-bdaa-eee217c2e66d", name: "float" },
  { _id: "d17ca586-6109-48e2-bde0-3cfaf530f514", name: "boolean" },
  { _id: "91740082-05bd-4d95-bea8-2653f5dbc693", name: "int16" },
  { _id: "6568d312-6fa3-414d-9e0e-c8186b0d3856", name: "double" },
  { _id: "1b3e145d-3222-4a56-a83b-50cbda379a75", name: "int32" },
  { _id: "9de435ec-425b-46d2-8867-718d97caed05", name: "int8" },
  { _id: "89042e95-7bbd-4f03-a795-33a546745da2", name: "uint8" },
  { _id: "37a9f101-5ac4-4af9-8d92-07613e783989", name: "uint8[]" },
  { _id: "3108d013-812c-4684-a816-b77e509f6a24", name: "string[]" },
];

export function getDataTypes() {
  return dataTypes.filter((dt) => dt);
}

export function getDataTypeId(dataType) {
  const { _id } = dataTypes.find((dt) => dt.name === dataType);
  return _id;
}
