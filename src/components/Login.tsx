import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"
import { LOGIN_USERS, REGISTER_USERS } from "@/services/user.service"
import { useRouter } from "next/router"
import { useToast } from "./ui/use-toast"
import { ToastAction } from "./ui/toast"

export function Login() {
  const route = useRouter();
  const { toast } = useToast()
  const [register,setRegister] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [login,setLogin] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setRegister({
      ...register,
      [name]: value
    });
  };
  const handleLoginChange =(e:any)=>{
    const {name, value} = e.target;
    setLogin({
      ...login,
      [name]: value
    })
  }

  const handleRegister = async() => {
    console.log("clicked")
    const user  = await REGISTER_USERS(register);
    if(user){
      console.log("User has been successfully register");
      toast({
        description: "User has been successfully register",
      })
      setRegister({
        name: '',
        email: '',
        password: ''
      });
    }else{
      console.log("Something went wrong on register");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
    
  };

  const handleLogin = async()=>{
    const user = await LOGIN_USERS(login);
    console.log("user",user)
    if(user){
      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem('token', user.token);
      console.log("User has been successfully login");
      toast({
        description: "User has been successfully login",
      })
      const isUser = localStorage.getItem("token");
      setLogin({
        email: '',
        password: ''
      });
      if(isUser) route.push('/')

    }else{
      console.log("Something went wrong on login");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }

  return (
    <Tabs defaultValue="Register" className="w-[400px] mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Register">Register</TabsTrigger>
        <TabsTrigger value="Login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="Register">
        <Card>
          <CardHeader>
            <CardTitle>REGISTER</CardTitle>
            <CardDescription>
              Make your account here. Click Register when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" name="name" value={register.name} onChange={handleChange}  />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" value={register.email} onChange={handleChange}  />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" value={register.password} onChange={handleChange}  />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleRegister}>Register</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="Login">
        <Card>
          <CardHeader>
            <CardTitle>LOGIN</CardTitle>
            <CardDescription>
             
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Email</Label>
              <Input id="email" type="email" name="email" value={login.email} onChange={handleLoginChange}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" value={login.password} onChange={handleLoginChange}/>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
