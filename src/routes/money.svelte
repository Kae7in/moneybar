<script lang='ts'>
	import { onDestroy, onMount } from 'svelte';
	import { CountUp } from 'countup.js';
	import { timer } from '../stores/timer';
	import { money, rate } from '../stores/money'; // import the money store

	export let rateValue = 100;

    $: {  
        rate.set(rateValue);
    }
    
	let targetEl: HTMLSpanElement;
	let countUpAnim: CountUp;
	
	onMount(() => {
		countUpAnim = new CountUp(targetEl, $money, { decimalPlaces: 2, duration: 0.5 })
		countUpAnim.start()
	});

    onDestroy(() => timer.destroy());
  
	$: if (countUpAnim) {
		countUpAnim.update($money);
	}
</script>


<div class="text-center text-primary text-[64px] font-bold">
	$<span bind:this={targetEl}>${$money}</span>
</div>
