import { createClient } from "@supabase/supabase-js";

async function page() {
  // const supabaseUrl = "https://bzqbnxwzvnyijjytlzdh.supabase.co";
  // const supabaseKey = process.env.SUPABASE_KEY as string;
  // const supabase = createClient(supabaseUrl, supabaseKey);

  // let { data, error } = await supabase.auth.signUp({
  //   email: "someone@email.com",
  //   password: "FbanknmIXAlkUDrKAXSM",
  // });

  // // let { data, error } = await supabase.auth.signInWithPassword({
  // //   email: "someone@email.com",
  // //   password: "FbanknmIXAlkUDrKAXSM",
  // // });

  // console.log(data);
  // console.log("Error:", error);
  // return <div>Hi {data.user?.id}</div>;
  return <div className="block bg-red-500">Hi</div>;
}

export default page;
