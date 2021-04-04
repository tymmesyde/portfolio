<template>
    <div class="scroll-indicator">
        <div class="mouse"></div>
    </div>
</template>

<script>
export default {
    name: 'ScrollIndicator'
}
</script>

<style lang="scss" scoped>
    .scroll-indicator {
        position: fixed;
        bottom: 25px;
        display: flex;
        justify-content: center;
        width: 100%;

        .mouse {
            display: flex;
            justify-content: center;
            height: 50px;
            width: 30px;
            border: 2px solid $secondary-color;
            border-radius: 20px;

            &::after {
                position: absolute;
                top: 10px;
                content: "";
                height: 10px;
                width: 4px;
                border: 2px solid $secondary-color;
                border-radius: 4px;
                animation: scrolling 4s ease-in-out infinite;
            }
        }
    }

    @keyframes scrolling {
        20%, 30% {
            opacity: 0;
            top: 20px;
            height: 15px;
        }
        40% {
            top: 10px;
            height: 10px;
        }
        90% {
            opacity: 1;
        }
    }

    @media only screen and (max-width: 768px) {
        .mouse {
            transform: rotate(180deg);
        }
    }
</style>