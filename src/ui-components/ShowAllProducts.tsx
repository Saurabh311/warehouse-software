import { ProductInventory } from "../model/productInventory";

export default function ShowAllProducts(props: { prop: ProductInventory[] }) {
  const listItems = props.prop.map((element) => {
    return (
      <ul>
        <tr
          style={{
            fontWeight: "bold",
            textAlign: "left",
            color: "red",
          }}
        >
          {element.name}
        </tr>
        <tr
          style={{
            textAlign: "left",
            color: "green",
          }}
        >
          Avialble : {element.stock}
        </tr>
      </ul>
    );
  });
  return <div>{listItems}</div>;
}
