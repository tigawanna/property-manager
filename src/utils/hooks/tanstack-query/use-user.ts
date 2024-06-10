import { LiquorstoreUserResponse } from "@/lib/pb/database";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePageContext } from "rakkasjs";

export function useUser(){
    const qc = useQueryClient()
    const page_ctx = usePageContext()
    const locals  = page_ctx.locals
    const mutation = useMutation({
        mutationFn: async() => {
            locals.pb?.authStore.clear();
            document.cookie = locals.pb?.authStore.exportToCookie({ httpOnly: false }); 
        },
        onSuccess:()=>{
            qc.invalidateQueries({ queryKey: ['viewer'] })
            window?.location&&window?.location.reload();
        }
    })
    
    const query = useQuery({
        queryKey: ['viewer'],
        queryFn:()=>{
            return locals.pb?.authStore.model as LiquorstoreUserResponse
        },
        refetchOnWindowFocus:true,
        refetchOnMount:true
    });

    return { user_query:query, user_mutation:mutation,page_ctx,logout:mutation.mutate} 
}
