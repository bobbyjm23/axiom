<?php
/**
 * Services — four icon cards.
 *
 * @package Sovereign_Onum
 */

return array(
	'name'        => 'sovereign-onum/services-four-col',
	'title'       => __( 'Services Four Column', 'sovereign-onum' ),
	'description' => _x( 'Four service cards with icon circles and learn-more links.', 'Block pattern description', 'sovereign-onum' ),
	'categories'  => array( 'sovereign-onum-sections' ),
	'content'     => '<!-- wp:group {"align":"full","backgroundColor":"surface","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-surface-background-color has-background"><!-- wp:paragraph {"align":"center","className":"so-eyebrow"} -->
<p class="has-text-align-center so-eyebrow">Our services</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontFamily":"var:preset|font-family|red-hat-display","fontSize":"var:preset|font-size|4xl"}},"textColor":"text-dark"} -->
<h2 class="wp-block-heading has-text-align-center has-text-dark-color has-text-color">Enterprise AI built for regulated firms</h2>
<!-- /wp:heading -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|2xl"},"blockGap":{"left":"var:preset|spacing|lg"}}}} -->
<div class="wp-block-columns alignwide" style="margin-top:var(--wp--preset--spacing--2xl)"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-service-card","layout":{"type":"default"}} -->
<div class="wp-block-group so-service-card"><!-- wp:paragraph {"className":"so-service-icon"} -->
<p class="so-service-icon">📄</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3,"textColor":"text-dark"} -->
<h3 class="wp-block-heading has-text-dark-color has-text-color">Cited answers</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"text","fontSize":"small"} -->
<p class="has-text-color has-small-font-size has-text-color">Every response links back to source documents — audit-ready from day one.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"so-link"} -->
<p class="so-link"><a href="/platform">Learn More →</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-service-card","layout":{"type":"default"}} -->
<div class="wp-block-group so-service-card"><!-- wp:paragraph {"className":"so-service-icon is-orange"} -->
<p class="so-service-icon is-orange">🏢</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3,"textColor":"text-dark"} -->
<h3 class="wp-block-heading has-text-dark-color has-text-color">Any size firm</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"text","fontSize":"small"} -->
<p class="has-text-color has-small-font-size has-text-color">From 10-user pilots to 500-seat production — one platform, your infrastructure.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"so-link"} -->
<p class="so-link"><a href="/industries">Learn More →</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-service-card","layout":{"type":"default"}} -->
<div class="wp-block-group so-service-card"><!-- wp:paragraph {"className":"so-service-icon"} -->
<p class="so-service-icon">🔒</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3,"textColor":"text-dark"} -->
<h3 class="wp-block-heading has-text-dark-color has-text-color">Full control</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"text","fontSize":"small"} -->
<p class="has-text-color has-small-font-size has-text-color">Data stays in Australia. No prompts sent to US cloud APIs. Board-ready governance.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"so-link"} -->
<p class="so-link"><a href="/security">Learn More →</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-service-card","layout":{"type":"default"}} -->
<div class="wp-block-group so-service-card"><!-- wp:paragraph {"className":"so-service-icon is-orange"} -->
<p class="so-service-icon is-orange">💰</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3,"textColor":"text-dark"} -->
<h3 class="wp-block-heading has-text-dark-color has-text-color">Predictable ROI</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"text","fontSize":"small"} -->
<p class="has-text-color has-small-font-size has-text-color">Fixed project pricing beats perpetual Copilot subscriptions. Own the stack.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"className":"so-link"} -->
<p class="so-link"><a href="/pricing">Learn More →</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->',
);
