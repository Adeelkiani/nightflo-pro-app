import { configureStore } from "@reduxjs/toolkit";
import DoorTeamInEventReducer from "./DoorTeamInEventReducer";
import DoorTeamReducer from "./DoorTeamReducer";
import EventsReducer from "./EventsReducer";
import InvitesReducer from "./InvitesReducer";
import PromotersInEventReducer from "./PromotersInEventReducer";
import PromotersReducer from "./PromotersReducer";

import UserReucer from "./UserReucer";
import ErrorsReducer from "./ErrorsReducer";
import RequestsReducer from "./RequestsReducer";
import GuestInvitesReducer from "./GuestList/GuestInvitesReducer";
import AdminReducer from "./AdminReducer";
import AdminInEventReducer from "./AdminInEventReducer";
import PaymentsReducer from "./PaymentsReducer";
import EventTablesReducer from "./EventTablesReducer";
import EventTicketsReducer from "./EventTicketsReducer";
// import expenseReducer from './expenseReducer';

export const tallyStore = configureStore({
  reducer: {
    // myExp: expenseReducer
    mUser: UserReucer,
    events: EventsReducer,
    invites: InvitesReducer,
    admin: AdminReducer,
    adminInEvent: AdminInEventReducer,
    promotors: PromotersReducer,
    doorteam: DoorTeamReducer,
    doorTeamInEvent: DoorTeamInEventReducer,
    promotorsInEvent: PromotersInEventReducer,
    error: ErrorsReducer,
    requests: RequestsReducer,
    guestInvites: GuestInvitesReducer,
    plans: PaymentsReducer,
    eventTables: EventTablesReducer,
    eventTickets: EventTicketsReducer,
  },
});
