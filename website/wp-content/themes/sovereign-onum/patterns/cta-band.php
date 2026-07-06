<?php
/**
 * CTA gradient band.
 *
 * @package Sovereign_Onum
 */

return array(
	'name'        => 'sovereign-onum/cta-band',
	'title'       => __( 'CTA Band', 'sovereign-onum' ),
	'description' => _x( 'Full-width gradient call-to-action band.', 'Block pattern description', 'sovereign-onum' ),
	'categories'  => array( 'sovereign-onum-sections' ),
	'content'     => '<!-- wp:group {"align":"full","className":"so-cta-band","style":{"spacing":{"padding":{"top":"var:preset|spacing|3xl","bottom":"var:preset|spacing|3xl"}}},"gradient":"cta-gradient","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull so-cta-band has-cta-gradient-gradient-background has-background" style="padding-top:var(--wp--preset--spacing--3xl);padding-bottom:var(--wp--preset--spacing--3xl)"><!-- wp:heading {"textAlign":"center","style":{"typography":{"fontFamily":"var:preset|font-family|red-hat-display","fontSize":"var:preset|font-size|4xl"}},"textColor":"white"} -->
<h2 class="wp-block-heading has-text-align-center has-white-color has-text-color">Take your AI to the next level!</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"white","fontSize":"large","style":{"spacing":{"margin":{"bottom":"var:preset|spacing|xl"}}}} -->
<p class="has-text-align-center has-white-color has-large-font-size has-text-color" style="margin-bottom:var(--wp--preset--spacing--xl)">Book a 30-minute discovery call. See Sovereign Warden live with your documents.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"white","textColor":"blue"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-blue-color has-white-background-color has-text-color has-background wp-element-button" href="/contact">Book Discovery</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group -->',
);
