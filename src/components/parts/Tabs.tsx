/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function TabsDisplay() {
  return (
    <Tabs defaultValue="teacher" className="w-[70%]   items-center justify-center flex flex-col  bg-none">
      <TabsList className="flex gap-3  w-full  bg-transparent items-center justify-center">
      <p className="text-black">I am a</p>
        <div className="grid grid-cols-5 gap-8 w-[90%] bg-transparent items-center justify-center">
        <TabsTrigger className="rounded-none border-black text-black border-r-2" value="teacher">teacher</TabsTrigger>
        <TabsTrigger className="rounded-none border-black text-black border-r-2" value="guitarist">guitarist</TabsTrigger>
        <TabsTrigger className="rounded-none border-black text-black border-r-2" value="songwriter">songwriter</TabsTrigger>
        <TabsTrigger className="rounded-none border-black text-black border-r-2" value="artist">artist</TabsTrigger>
        <TabsTrigger className="rounded-none  text-black" value="family-man">family man</TabsTrigger>
        </div>
      </TabsList>
      <div className="flex my-12 items-center justify-center">
      <TabsContent value="teacher">
      <p>I started Spicy Guitar Academy in 2016 - but began teaching way before that.
                I carefully design my courses to help you make the best out of your guitar time!
                My lessons feel like private lessons and are just as effective.
                Some of them are free. Teaching the world how to play guitar is what I'll do forever.
            </p>
      </TabsContent>
      <TabsContent value="guitarist">
      <p>you started Spicy Guitar Academy in 2016 - but began teaching way before that.
                I carefully design my courses to help you make the best out of your guitar time!
                My lessons feel like private lessons and are just as effective.
                Some of them are free. Teaching the world how to play guitar is what I'll do forever.
            </p>
      </TabsContent>
      <TabsContent value="songwriter">
      <p>I started writing songs back in the day - but began teaching way before that.
                I carefully design my courses to help you make the best out of your guitar time!
                My lessons feel like private lessons and are just as effective.
                Some of them are free.
            </p>
      </TabsContent>
      <TabsContent value="artist">
      <p>I started Spicy Guitar Academy in 2016 - but began teaching way before that.
                I carefully design my courses to help you make the best out of your guitar time!
                My lessons feel like private lessons and are just as effective.
                Some of them are free. Teaching the world how to play guitar is what I'll do forever.
            </p>
      </TabsContent>
      <TabsContent value="family-man">
      <p>I am a family man first before a masdfad.
                My lessons feel like private lessons and are just as effective.
                Some of them are free. Teaching the world how to play guitar is what I'll do forever.
            </p>
      </TabsContent>
      </div>
    </Tabs>
  )
}
