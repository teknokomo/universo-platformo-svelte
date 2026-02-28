<script lang="ts">
    /**
     * GuestStartPage – Landing page for non-authenticated users
     *
     * Displays:
     * - Hero section with title and "To the future" button (centered vertically)
     * - Testimonials section (4 cards in a row, at the bottom)
     * - Footer with contact information
     */
    import Hero from './components/Hero.svelte'
    import Testimonials from './components/Testimonials.svelte'
    import StartFooter from '../components/StartFooter.svelte'

    export let authPath: string = '/auth'
</script>

<div class="guest-page">
    <!-- Background image overlay -->
    <div class="bg-overlay" aria-hidden="true"></div>

    <!-- Hero takes available space -->
    <div class="hero-wrapper">
        <Hero {authPath} />
    </div>

    <!-- Testimonials fixed to bottom area -->
    <div class="testimonials-wrapper">
        <Testimonials />
    </div>

    <!-- Footer -->
    <div class="footer-wrapper">
        <StartFooter variant="landing" />
    </div>
</div>

<style>
    .guest-page {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background: linear-gradient(135deg, #e8f0fe 0%, #f0f4f8 50%, #e1ecf7 100%);
        position: relative;
    }

    .bg-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(ellipse 80% 50% at 50% -20%, hsla(210, 100%, 90%, 0.85), transparent);
        pointer-events: none;
        z-index: 0;
    }

    .hero-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        z-index: 1;
        position: relative;
    }

    .testimonials-wrapper {
        flex-shrink: 0;
        z-index: 1;
        position: relative;
    }

    .footer-wrapper {
        flex-shrink: 0;
        z-index: 1;
        position: relative;
    }
</style>
