import React from "react"
import { Redirect } from "react-router-dom"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Account
import ChartOfAccountIndex from "../pages/ChartOfAccount/index"
import ChartOfAccountCreate from "../pages/ChartOfAccount/create"
import TransactionIndex from "../pages/Transaction/index"
import TransactionCreate from "../pages/Transaction/create"

// Cheque
import BankAccountIndex from "../pages/BankAccount/index"
import BankAccountCreate from "../pages/BankAccount/create"
import ChequeIndex from "../pages/Cheque/index"
import ChequeCreate from "../pages/Cheque/create"

// Report
import BalanceSheet from "../pages/Report/balanceStatement"
import IncomeStatement from "../pages/Report/incomeStatement"
import CustomReport from "../pages/Report/filterReport"
import ChequeReport from "../pages/Report/chequeReport"

// User
import UserIndex from "../pages/User/index"
import UserCreate from "../pages/User/create"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"


const userRoutes = [
  { path: "/dashboard", component: Dashboard },

  //Account
  { path: "/chart-of-account", component: ChartOfAccountCreate },
  { path: "/chart-of-account-list", component: ChartOfAccountIndex },
  { path: "/transaction", component: TransactionCreate },
  { path: "/transaction-list", component: TransactionIndex },

  //Cheque
  { path: "/bank-account", component: BankAccountCreate },
  { path: "/bank-account-list", component: BankAccountIndex },
  { path: "/cheque", component: ChequeCreate },
  { path: "/cheque/:id", component: ChequeCreate },
  { path: "/cheque-list", component: ChequeIndex },

  //Report
  { path: "/balance-sheet", component: BalanceSheet },
  { path: "/income-statement", component: IncomeStatement },
  { path: "/custom-report", component: CustomReport },
  { path: "/cheque-report", component: ChequeReport },

    
  //User
  { path: "/user", component: UserCreate },
  { path: "/user-list", component: UserIndex },

  // //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [

  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register }
]

export { userRoutes, authRoutes }