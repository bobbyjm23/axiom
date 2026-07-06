<?php
/**
 * Hero — Onum Home 7 split layout.
 *
 * @package Sovereign_Onum
 */

$hero_svg = get_template_directory_uri() . '/assets/hero-illustration.svg';

return array(
	'name'        => 'sovereign-onum/hero-home7',
	'title'       => __( 'Hero Home 7', 'sovereign-onum' ),
	'description' => _x( 'Bright split hero with gradient mesh background and illustration.', 'Block pattern description', 'sovereign-onum' ),
	'categories'  => array( 'sovereign-onum-heroes' ),
	'content'     => '<!-- wp:group {"align":"full","className":"so-hero","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull so-hero"><!-- wp:columns {"verticalAlignment":"center","align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|3xl"}}}} -->
<div class="wp-block-columns alignwide are-vertically-aligned-center"><!-- wp:column {"verticalAlignment":"center","width":"52%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:52%"><!-- wp:paragraph {"className":"so-eyebrow"} -->
<p class="so-eyebrow">Sovereign AI for Australia</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":1,"style":{"typography":{"fontFamily":"var:preset|font-family|red-hat-display","fontSize":"var:preset|font-size|5xl","fontWeight":"900"}},"textColor":"text-dark"} -->
<h1 class="wp-block-heading has-text-dark-color has-text-color">Transform compliance risk into competitive advantage</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"text","fontSize":"large","style":{"spacing":{"margin":{"top":"var:preset|spacing|lg"}}}} -->
<p class="has-text-color has-large-font-size has-text-color" style="margin-top:var(--wp--preset--spacing--lg)">ChatGPT-class UX, document Q&amp;A with citations, and a clear path to on-premises or air-gap — live in days, not months.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"var:preset|spacing|xl"},"blockGap":"var:preset|spacing|md"}}} -->
<div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--xl)"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/contact">Book Discovery</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"so-btn-cyan"} -->
<div class="wp-block-button so-btn-cyan"><a class="wp-block-button__link wp-element-button" href="/pricing">View Pricing</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","width":"48%","className":"so-hero-illustration"} -->
<div class="wp-block-column is-vertically-aligned-center so-hero-illustration" style="flex-basis:48%"><!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="' . esc_url( $hero_svg ) . '" alt="Sovereign AI platform illustration"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->',
);
