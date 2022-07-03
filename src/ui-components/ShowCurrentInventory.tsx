import { Inventory } from "../model/inventory";

export default function ShowCurrentInventory(props: { prop: Inventory[] }) {
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
          ID : {element.articleId}
        </tr>
        <tr
          style={{
            textAlign: "left",
            color: "blue",
          }}
        >
          Name : {element.name}
        </tr>
        <tr
          style={{
            textAlign: "left",
            color: "green",
          }}
        >
          Avialble stock : {element.stock}
        </tr>
      </ul>
    );
  });
  return <div>{listItems}</div>;
}
