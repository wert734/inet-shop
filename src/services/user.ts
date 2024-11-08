import { ILogin, IProfileAvatar, IProfileInfo, IRegister } from "../types";
import api from "./api";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useRegisterMutation = ()=>{
    return useMutation({
        mutationFn: (useData: IRegister)=> api.post('/auth/register', useData)
    })
}

export const userLoginMutation = ()=>{
    return useMutation({
        mutationFn: (useData: ILogin)=> api.post('/auth/login', useData),
        onSuccess: ( {data} )=>{
            if(data && data.access) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
            }
            console.log(data);
        }
    })
}

export const useCurrentUser = ()=>{
    const accessToken = localStorage.getItem('access_token')
    return useQuery({
        queryKey: ['current'],
        queryFn: ()=> api.get('/auth/users/profile'),
        enabled: !!accessToken,
        select: (data)=> data.data
    })
}
export const useProfileInfoMutation = ()=>{
    return useMutation({
        mutationFn: (useData: IProfileInfo)=> {
            const { id, username, email, password } = useData;
            return api.put(`/auth/users/${id}/update`, { username, email, password })
        }
    })
}

export const useProfileAvatarMutation = ()=>{
    return useMutation({
        mutationFn: (useData: IProfileAvatar)=> {
            const { id, avatar } = useData;
            return api.put(`/auth/users/${id}/update/avatar`, avatar)
        }
    })
}