//content/display of the pantry
import { useGetPantryItemsbyHouseholdIdQuery } from "../storage/pantryPartyApi"

export default function PantryList() {
  const { data = {}, error, isLoading,} = useGetPantryItemsbyHouseholdIdQuery(5)

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)

  return (
    <div>
      {data.map((item) => (
        <div key={item.householdId} >
          <h2>{item.name}</h2>
          
        </div>
      ))}
    </div>
  )
}