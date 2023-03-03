import { signOut } from "@utils/authenticationUtils";

export const navBarItems = ["Articles", "Profile"];
export const appBarSettingsItems = [
    {
        name: "Profile",
        onClick: () => { console.log('hi'); }
    }, 
    {
        name: "Favourite Articles",
        onClick: () => { console.log('hi') }
    },
    {
        name: "Sign Out",
        onClick: (dispatch) => signOut(dispatch)
    },
];
