<script lang="ts">
    /**
     * StartFooter – Footer with contact information
     *
     * Two variants:
     * - 'landing' (default): shown on the guest start page
     * - 'internal': shown on the authenticated start page (compact)
     */
    export let variant: 'landing' | 'internal' = 'landing'
</script>

<footer class="start-footer" class:internal={variant === 'internal'}>
    <div class="footer-content">
        <span class="footer-brand">Universo Platformo</span>
        <nav class="footer-links">
            <a href="/legal/privacy">Privacy</a>
            <a href="/legal/terms">Terms</a>
            <a href="mailto:contact@universo.dev">Contact</a>
        </nav>
        <span class="footer-copy">© {new Date().getFullYear()} Teknokomo</span>
    </div>
</footer>

<style>
    .start-footer {
        width: 100%;
        padding: 1rem 1.5rem;
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(4px);
        border-top: 1px solid rgba(0, 0, 0, 0.08);
    }

    .start-footer.internal {
        background: #f8fafc;
        backdrop-filter: none;
    }

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .footer-brand {
        font-weight: 700;
        font-size: 0.9rem;
        color: #0f172a;
    }

    .footer-links {
        display: flex;
        gap: 1.25rem;
    }

    .footer-links a {
        font-size: 0.85rem;
        color: #475569;
        text-decoration: none;
        transition: color 0.2s;
    }

    .footer-links a:hover {
        color: #1976d2;
    }

    .footer-copy {
        font-size: 0.8rem;
        color: #94a3b8;
    }
</style>
