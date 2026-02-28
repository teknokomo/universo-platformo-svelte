<script lang="ts">
    /**
     * Hero – Landing page hero section
     *
     * Displays:
     * - Main heading with highlighted "all worlds" text
     * - Subtitle describing the platform
     * - "To the future" button linking to the auth page
     */
    export let authPath: string = '/auth'
</script>

<section id="hero">
    <div class="hero-container">
        <div class="hero-content">
            <h1 class="hero-title">
                <span class="title-prefix">Enter</span>&nbsp;<span class="title-highlight">all worlds</span>
            </h1>
            <p class="hero-description">
                Universo Platformo — an open platform for creating immersive multi-world experiences.
                Connect, create, and explore together.
            </p>
            <div class="hero-actions">
                <a href={authPath} class="btn btn-primary btn-large">
                    To the future
                </a>
            </div>
        </div>
    </div>
</section>

<style>
    #hero {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .hero-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
        padding: 7rem 1rem 4rem;
    }

    .hero-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 70%;
        gap: 2rem;
    }

    .hero-title {
        font-size: clamp(3rem, 10vw, 3.5rem);
        font-weight: 700;
        text-align: center;
        color: #0f172a;
        margin: 0;
        line-height: 1.1;
    }

    .title-highlight {
        color: #1976d2;
    }

    .hero-description {
        text-align: center;
        color: #1e293b;
        font-size: 1.15rem;
        max-width: 80%;
        margin: 0;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        line-height: 1.6;
    }

    .hero-actions {
        padding-top: 2rem;
        display: flex;
        justify-content: center;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 600;
        transition: background-color 0.2s, box-shadow 0.2s;
        cursor: pointer;
        border: none;
    }

    .btn-primary {
        background-color: #0288d1;
        color: #ffffff;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
    }

    .btn-primary:hover {
        background-color: #0277bd;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }

    .btn-large {
        padding: 0.75rem 2rem;
        font-size: 1rem;
        min-width: fit-content;
    }

    @media (max-width: 600px) {
        .hero-container {
            padding: 5rem 1rem 3rem;
        }

        .hero-content {
            max-width: 100%;
        }

        .hero-description {
            max-width: 100%;
        }
    }
</style>
