import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IUser {
    id: number,
    avatar?: null | string,
    username: string,
    email: string,
}

interface IUserStore {
  user: null | IUser,
  isAuth: boolean,
  setUser: (data: IUser)=>void,
  logout: ()=>void
}



const userStore = create<IUserStore>()(devtools((set) => ({
    user: null,
    isAuth: false,
    setUser: (data)=>{
        set((state)=>({user: data, isAuth: true}))
    },
    logout: ()=>{
        set(()=>({user: null, isAuth: false}))
    }
})))

export default userStore