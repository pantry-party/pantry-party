//content/display of the pantry
import { useGetPantryItemsbyHouseholdIdQuery } from "../storage/pantryPartyApi";
import { useContext, useState } from "react";
import {
  addIcon,
  alertIcon,
  sharingIcon,
  notSharingIcon,
} from "../styles/icons";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import { categoriesContext, userContext } from "../storage/context.jsx";
import { useSelector } from "react-redux";

export default function PantryList() {
  const userInfo = useContext(userContext);
  const householdId = userInfo.sharedHouse || userInfo.defaultHouse;
  const {
    data = {},
    error,
    isLoading,
  } = useGetPantryItemsbyHouseholdIdQuery(householdId);
  const categories = useContext(categoriesContext);
  const [itemEdit, setItemEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [addForm, setAddForm] = useState(false);

  const token = useSelector((it) => it.state.token);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Log in to open your pantry...{error.message}</div>;
  }

  let dateSet = [];
  function createWeeks() {
    // print out all mondays from 1 year ago to today
    let day;
    let weekStart;
    let weekEnd;
    for (let i = 0; i < 365; i++) {
      day = new Date();
      day.setDate(day.getDate() - 365);
      day.setHours(0, 0, 0, 0);
      day.setDate(day.getDate() + i);
      if (day.getDay() === 1) {
        weekStart = day;
      } else if (weekStart && day.getDay() === 0) {
        weekEnd = day;
      }

      if (weekStart && weekEnd) {
        let week = { weekStart, weekEnd, items: [] };
        dateSet.push(week);
        weekStart = null;
        weekEnd = null;
      }
    }

    data.forEach((item) => {
      let moved = new Date(item.dateMoved);
      dateSet.forEach((week) => {
        if (week.weekStart <= moved && moved < week.weekEnd) {
          console.log("match");
          week.items.push(item);
        }
      });
    });

    console.log(dateSet);

    return dates;
  }
  createWeeks();

  //edit items
  function itemEditor(itemId) {
    if (itemEdit == false) {
      setItemEdit(!itemEdit);
      setEditId(itemId);
    } else if (itemEdit == true && itemId == editId) {
      setItemEdit(!itemEdit);
    } else if (itemEdit == true) {
      setEditId(itemId);
    }
  }

  //format dateMoved
  const dateType = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  function parseDate(timestamp) {
    const date = new Date(timestamp);

    return date.toLocaleDateString(undefined, dateType);
  }

  return (
    <>
      {/* title, add new item button */}
      <div>
        <h1>Your Pantry</h1>
        <button
          title="Add New Item"
          onClick={() => {
            setAddForm(!addForm);
          }}
        >
          {addIcon}
        </button>
      </div>

      {/* link to add form component */}
      <div>
        {addForm && <AddItem householdId={householdId} location="pantry" />}
      </div>

      {/* display items and icons */}
      <div>
        {data.map((item) => (
          <div key={item.id} className={item.category}>
            {/* edit item button */}
            <span className={item.color}>
              <button
                title="Edit Item Details"
                onClick={() => {
                  itemEditor(item.id);
                }}
              >
                {
                  categories.find(
                    (category) => item.category === category.name.toLowerCase()
                  ).icon
                }
              </button>
            </span>

            {console.log(item)}

            <h2>
              {item.name}{" "}
              {item.isLow && <span className="blue"> {alertIcon}</span>}{" "}
            </h2>
            <p>{parseDate(item.dateMoved)}</p>

            {/* display alerts */}
            {item.sharing && <div className="green"> {sharingIcon}</div>}
            {item.sharing === false && (
              <div className="red"> {notSharingIcon}</div>
            )}

            {itemEdit && item.id === editId && (
              <EditItem item={item} user={userInfo} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
