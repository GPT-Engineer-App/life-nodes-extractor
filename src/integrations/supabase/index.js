import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

// EXAMPLE TYPES SECTION
// DO NOT USE TYPESCRIPT

### foos

| name    | type | format | required |
|---------|------|--------|----------|
| id      | int8 | number | true     |
| title   | text | string | true     |
| date    | date | string | true     |

### bars

| name    | type | format | required |
|---------|------|--------|----------|
| id      | int8 | number | true     |
| foo_id  | int8 | number | true     |  // foreign key to foos
	
*/

// Example hook for models

export const useFoo = ()=> useQuery({
    queryKey: ['foos'],
    queryFn: fromSupabase(supabase.from('foos')),
})
export const useAddFoo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFoo)=> fromSupabase(supabase.from('foos').insert([{ title: newFoo.title }])),
        onSuccess: ()=> {
            queryClient.invalidateQueries('foos');
        },
    });
};

export const useBar = ()=> useQuery({
    queryKey: ['bars'],
    queryFn: fromSupabase(supabase.from('bars')),
})
export const useAddBar = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newBar)=> fromSupabase(supabase.from('bars').insert([{ foo_id: newBar.foo_id }])),
        onSuccess: ()=> {
            queryClient.invalidateQueries('bars');
        },
    });
};

