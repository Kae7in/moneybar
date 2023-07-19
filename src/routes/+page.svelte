<!-- /src/routes/+page.svelte -->

<script>
    import { money } from "../stores/money";
    import Money from "./money.svelte";
    import { onDestroy } from "svelte";
  
    $: blurred = false;
    $: title = blurred ? '— Keep Going —' : `$${$money.toFixed(2)}`;
  
    const onBlur = () => {
      setTimeout(() => {
        blurred = true;
      }, 5000);
    };
  
    const onFocus = () => {
        blurred = false;
    };
  
    if (typeof window !== "undefined") {
        window.addEventListener("blur", onBlur);
        window.addEventListener("focus", onFocus);
    }
  
    onDestroy(() => {
        if (typeof window !== "undefined") {
            window.removeEventListener("blur", onBlur);
            window.removeEventListener("focus", onFocus);
        }
    });
  </script>
  
  <svelte:head>
    <title>{title}</title>
  </svelte:head>
  
  <div class="w-full h-full flex items-center">
    <div class="w-full flex place-content-center">
      <Money />
    </div>
  </div>
  