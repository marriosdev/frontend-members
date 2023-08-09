<template>
    <span>
        <div class="alert-ani jello-horizontal" :class="tipo">
            <p>{{ mensagem }}</p>
        </div>
    </span>
</template>

<script>
export default {
    name: "Alert",
    props: {
        message: String,
        type: String
    },
}
</script>

<style>

.jello-horizontal{
    animation:jello-horizontal .9s alternate forwards
}
.alert-ani {
    color: black;
    background-color: red;
}
</style>