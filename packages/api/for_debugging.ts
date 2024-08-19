import API from "@lib-apis";

const getBaseUrl = () => "https://moa-engineers.midasit.com:443/civil";
const getMapiKey = () =>
  "eyJ1ciI6ImtoMTAxMkBtaWRhc2l0LmNvbSIsInBnIjoiY2l2aWwiLCJjbiI6InNUeFdRVjhyUVEifQ.1d5e81bb0f1bec0b53f76d870fdbb971c94601ed0c5f0e43fdb880d787d31383";

async function main() {
  const api = new API({
    baseUrl: getBaseUrl(),
    mapiKey: getMapiKey(),
  });
  const rawNode = await api.db.nodeElement.node.getRaw();
  console.log(rawNode["1"].X, rawNode["1"].Y, rawNode["1"].Z);

  const helperNode = await api.db.nodeElement.node.get();
  const Node1 = helperNode.getValue(1);
  console.log(Node1.X, Node1.Y, Node1.Z);

  const elems = await api.db.nodeElement.element.get();
  elems.getValue(1).ANGLE;

  const data2 = await api.combine.loadCombination.names.get({
    includeEmpty: true,
  });
  console.log(data2);
}

main();
