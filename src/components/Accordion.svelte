<script>
  export let open = false;
	import { slide } from 'svelte/transition';
  
  let arrow = true;
  let arrowString = (arrow == true ? "up" : "down");
	const handleClick = () => {
    open = !open;
    arrow = !arrow;
    arrowString = (arrow == true ? "up" : "down");
    if(open){
      document.getElementById("button").style.borderRadius = "8px 8px 0px 0px";
    }
    else{
      document.getElementById("button").style.borderRadius = "8px";
    }
  }
</script>

<div class="accordion">
	<div class="header">
		
		<button on:click={handleClick} id="button">
      <img src="./src/assets/Arrow_{arrowString}.svg" alt="arrow" id="arrow-icon">
		</button>
    <div class="text">
			<slot name="head"></slot>	
		</div>
	</div>
	
	{#if open}
	<div class="details" transition:slide>
		<slot name="details">
		</slot>
	</div>
	{/if}
</div>

<style>
	div.accordion {
		margin: 1rem 0;
    z-index: 1000;
    position: fixed;
    left: 20px;
    bottom: 10px;
	}
  
	div.header {
		display:flex;
		width:100%;
	}

  #button{
    border-radius: 8px;
    background-color: rgb(12, 87, 78);
  }
	
	div.header .text {
		flex: 1;
		margin-right: 5px;
	}
	
	div.details {
		background-color: #0f0f0f;
    border-radius: 0 10px 10px 10px;
		padding:1rem;
	}
</style>
