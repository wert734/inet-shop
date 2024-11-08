import { IProduct } from "../types";
import api from "./api";
import { useQuery, useMutation, UseQueryResult } from "@tanstack/react-query";

interface IParams {
    sort: string,
    search: string,
    limit: number,
    skip: number
}

export const useGetProducts = ({sort, search, limit, skip}: IParams)=>{
    return useQuery({
        queryKey: ['products', sort, search, skip],
        queryFn: ()=> api.get(`/products?ordering=${sort}&search=${search}&limit=${limit}&offset=${skip}`),
        select: (data)=> data.data
    })
}

export const useGetProductById = (id: string | undefined)
:UseQueryResult<IProduct>=>{
    return useQuery({
        queryKey: ['product', id ],
        queryFn: ()=> api.get(`products/${id}`),
        select: (data)=> data.data
    })
}
//'http://45.138.158.114/api/v1/products? limit=6 & offset=0 & ordering=rating & search=fsdfsd'