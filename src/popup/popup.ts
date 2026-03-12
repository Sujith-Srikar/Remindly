import Popup from "./pages/Popup.svelte"
import { mount } from "svelte"

const app = mount(Popup, {
    target: document.getElementById('app')!
});

export default app;