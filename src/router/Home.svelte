<script>
    import Footer from "../component/Footer.svelte";
    import Tabs from '../component/Tab.svelte';
    import Add from './Add.svelte';
    import Display from './Display.svelte'

    let items = ['Display' , 'Add'];
    let activeItem = 'Display';
    const tabChange = (e) => activeItem = e.detail;

    let expens = [

        ];

    const handleAdd = (e) => {
        const expen = e.detail;
        expens = [expen, ...expens];
        console.log(expens);
    }
</script>

<body>
    <Tabs {activeItem} {items} on:tabChange={tabChange} />

    {#if activeItem === 'Display'}
   <Display bind:expens={expens} />
    {:else if activeItem === 'Add'}
    <Add on:add={handleAdd} />
    {/if}

</body>
<Footer />
