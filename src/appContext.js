import React, {useContext, useState} from 'react'

const TokenContext = React.createContext();
const TokenUpdatedContext = React.createContext();

export function useToken(){
  return useContext(TokenContext)
}

export function useTokenUpdate(){
  return useContext(TokenUpdatedContext)
}

export function AppProvider({children}){
  const [token, setToken] = useState()

  function tokenInfo(token){
    setToken(token)
  }

  return(
    <TokenContext.Provider value={token}>
      <TokenUpdatedContext.Provider value={tokenInfo}>
        {children}
      </TokenUpdatedContext.Provider>
    </TokenContext.Provider>
  )
}