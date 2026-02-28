<script lang="ts">
    /**
     * Testimonials – Social proof section for the landing page
     *
     * Displays 4 cards in a row at the bottom of the hero section.
     */

    const testimonials = [
        {
            name: 'Aria S.',
            role: 'World Builder',
            quote: 'Universo Platformo lets me create entire galaxies in days, not months.'
        },
        {
            name: 'Marco T.',
            role: 'Game Developer',
            quote: 'The multi-world system is a game changer. My players never want to leave.'
        },
        {
            name: 'Yuki K.',
            role: 'Community Manager',
            quote: 'Managing thousands of users across worlds is finally intuitive and powerful.'
        },
        {
            name: 'Priya N.',
            role: 'Creative Director',
            quote: 'We ship immersive experiences 3x faster using the platform open tools.'
        }
    ]
</script>

<section class="testimonials">
    <div class="testimonials-grid">
        {#each testimonials as item}
            <div class="testimonial-card">
                <blockquote class="testimonial-quote">"{item.quote}"</blockquote>
                <footer class="testimonial-footer">
                    <span class="testimonial-name">{item.name}</span>
                    <span class="testimonial-role">{item.role}</span>
                </footer>
            </div>
        {/each}
    </div>
</section>

<style>
    .testimonials {
        width: 100%;
        padding: 1.5rem 1rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(4px);
    }

    .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .testimonial-card {
        background: rgba(255, 255, 255, 0.85);
        border-radius: 8px;
        padding: 1rem 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .testimonial-quote {
        font-size: 0.9rem;
        color: #334155;
        margin: 0;
        line-height: 1.5;
        font-style: italic;
    }

    .testimonial-footer {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
    }

    .testimonial-name {
        font-weight: 600;
        font-size: 0.85rem;
        color: #0f172a;
    }

    .testimonial-role {
        font-size: 0.75rem;
        color: #64748b;
    }

    @media (max-width: 900px) {
        .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 500px) {
        .testimonials-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
