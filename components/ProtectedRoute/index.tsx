import React, { useEffect } from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router=useRouter();
    const {status}=useSession();
    useEffect(()=>{
    if(status==="unauthenticated"){
        router.push("/")
    }
    },[router,status])
   if(status==="authenticated") return null;
  return <div>index</div>;
};

export default ProtectedRoute;
