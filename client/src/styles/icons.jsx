import { createContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// categories icons
import { faBottleDroplet, faCow, faBowlRice, faSnowflake, faUtensils, faCircleQuestion, faAppleWhole, faDrumstickBite } from '@fortawesome/free-solid-svg-icons'

export const bottlesIcon = <FontAwesomeIcon icon={faBottleDroplet} />
export const dairyIcon = <FontAwesomeIcon icon={faCow} />
export const dryIcon = <FontAwesomeIcon icon={faBowlRice} />
export const freezerIcon = <FontAwesomeIcon icon={faSnowflake} />
export const mealsIcon = <FontAwesomeIcon icon={faUtensils} />
export const otherIcon = <FontAwesomeIcon icon={faCircleQuestion} />
export const produceIcon = <FontAwesomeIcon icon={faAppleWhole} />
export const proteinIcon = <FontAwesomeIcon icon={faDrumstickBite} />

// alerts icons
import { faCircleExclamation, faCircleInfo, faPencil, faTrash, faCirclePlus, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export const alertIcon = <FontAwesomeIcon icon={faCircleExclamation} />
export const infoIcon = <FontAwesomeIcon icon={faCircleInfo} />
export const editIcon = <FontAwesomeIcon icon={faPencil} />
export const deleteIcon = <FontAwesomeIcon icon={faTrash} />
export const addIcon = <FontAwesomeIcon icon={faCirclePlus} />
export const sharingIcon = <FontAwesomeIcon icon={faCircleCheck} />
export const notSharingIcon = <FontAwesomeIcon icon={faCircleXmark} />

// accounts icons
import { faCircleUser, faUserPlus, faUserMinus, faHouseUser, faHouseMedical, faHouseCircleXmark, faHouseCircleExclamation } from '@fortawesome/free-solid-svg-icons'

export const userIcon = <FontAwesomeIcon icon={faCircleUser} />
export const addUsersIcon = <FontAwesomeIcon icon={faUserPlus} />
export const removeUserIcon = <FontAwesomeIcon icon={faUserMinus} />
export const createHouseholdIcon = <FontAwesomeIcon icon={faHouseUser} />
export const joinHouseholdIcon = <FontAwesomeIcon icon={faHouseMedical} />
export const leaveHouseholdIcon = <FontAwesomeIcon icon={faHouseCircleXmark} />
export const renameHouseholdIcon = <FontAwesomeIcon icon={faHouseCircleExclamation} />

// navigation icons

import { faBasketShopping, faKitchenSet, faUser } from '@fortawesome/free-solid-svg-icons'

export const groceryListIcon = <FontAwesomeIcon icon={faBasketShopping} />
export const pantryIcon = <FontAwesomeIcon icon={faKitchenSet} />
export const accountIcon = <FontAwesomeIcon icon={faUser} />

// action icons 
import { faArrowRotateLeft, faXmark, faCircleXmark} from '@fortawesome/free-solid-svg-icons'

export const goBackIcon = <FontAwesomeIcon icon={faArrowRotateLeft} />
export const xIcon = <FontAwesomeIcon icon={faXmark} />
export const xCircleIcon = <FontAwesomeIcon icon={faCircleXmark} />