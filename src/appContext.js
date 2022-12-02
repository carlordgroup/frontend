import React, {useContext, useState} from 'react'

const TokenContext = React.createContext();
const TokenUpdatedContext = React.createContext();
const AdminContext = React.createContext();
const AdminUpdatedContext = React.createContext();

export function useToken(){
  return useContext(TokenContext)
}

export function useTokenUpdate(){
  return useContext(TokenUpdatedContext)
}

export function useAdmin(){
  return useContext(AdminContext)
}

export function useAdminUpdate(){
  return useContext(AdminUpdatedContext)
}

export function AppProvider({children}){
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [admin, setAdmin] = useState(true);

  function tokenInfo(token){
    setToken(token)
  }

  function adminSetter(setter){
    setAdmin(setter)
  }

  return(
    <TokenContext.Provider value={token}>
      <TokenUpdatedContext.Provider value={tokenInfo}>
        <AdminContext.Provider value={admin}>
          <AdminUpdatedContext.Provider value={adminSetter}>
            {children}
          </AdminUpdatedContext.Provider>
        </AdminContext.Provider>
      </TokenUpdatedContext.Provider>
    </TokenContext.Provider>
  )
}