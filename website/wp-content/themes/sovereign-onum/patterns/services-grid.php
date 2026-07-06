<?php
/**
 * Services grid — six numbered items with thumbnails.
 *
 * @package Sovereign_Onum
 */

$img1 = sovereign_onum_image_url( 'ai-abstract.jpg' );
$img2 = sovereign_onum_image_url( 'cloud-tech.jpg' );
$img3 = sovereign_onum_image_url( 'cybersecurity.jpg' );

return array(
	'name'        => 'sovereign-onum/services-grid',
	'title'       => __( 'Services Grid', 'sovereign-onum' ),
	'description' => _x( 'Six numbered service items in a two-column grid.', 'Block pattern description', 'sovereign-onum' ),
	'categories'  => array( 'sovereign-onum-sections' ),
	'content'     => '<!-- wp:group {"align":"full","className":"so-section-alt","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull so-section-alt"><!-- wp:heading {"textAlign":"center","style":{"typography":{"fontFamily":"var:preset|font-family|red-hat-display","fontSize":"var:preset|font-size|4xl"}},"textColor":"text-dark"} -->
<h2 class="wp-block-heading has-text-align-center has-text-dark-color has-text-color">Platform capabilities</h2>
<!-- /wp:heading -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|2xl"},"blockGap":{"left":"var:preset|spacing|2xl"}}}} -->
<div class="wp-block-columns alignwide" style="margin-top:var(--wp--preset--spacing--2xl)"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-grid-service","layout":{"type":"default"}} -->
<div class="wp-block-group so-grid-service"><!-- wp:paragraph {"className":"so-grid-service__num"} -->
<p class="so-grid-service__num">01</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4,"textColor":"text-dark"} -->
<h4 class="wp-block-heading has-text-dark-color has-text-color">Document Q&amp;A</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"text","fontSize":"small"} -->
<p class="has-text-color has-small-font-size has-text-color">Natural language search across policies, contracts, and knowledge bases with source citations.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"so-grid-service","layout":{"type":"default"}} -->
<div class="wp-block-group so-grid-service"><!-- wp:paragraph {"className":"so-grid-service__num"} -->
<p class="so-grid-service__num">02</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4,"textColor":"text-dark"} -->
<h4 class="wp-block-heading has-text-dark-color has-text-color">SSO &amp; RBAC</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"text","fontSize":"small"} -->
<p class="has-text-color has-small-font-size has-text-color">Azure AD, Okta, and SAML integration. Role-based access per workspace and document set.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"so-grid-service","layout":{"type":"default"}} -->
<div class="wp-block-group so-grid-service"><!-- wp:paragraph {"className":"so-grid-service__num"} -->
<p class="so-grid-service__num">03</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4,"textColor":"text-dark"} -->
<h4 class="wp-block-heading has-text-dark-color has-text-color">Audit logging</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"text","fontSize":"small"} -->
<p class="has-text-color has-small-font-size has-text-color">Full query and response logs. Export for compliance reviews and board reporting.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-grid-service","layout":{"type":"default"}} -->
<div class="wp-block-group so-grid-service"><!-- wp:paragraph {"className":"so-grid-service__num"} -->
<p class="so-grid-service__num">04</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4,"textColor":"text-dark"} -->
<h4 class="wp-block-heading has-text-dark-color has-text-color">Multi-model routing</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"text","fontSize":"small"} -->
<p class="has-text-color has-small-font-size has-text-color">Route to local Llama, Mistral, or cloud models via LiteLLM. Switch models without retraining.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"so-grid-service","layout":{"type":"default"}} -->
<div class="wp-block-group so-grid-service"><!-- wp:paragraph {"className":"so-grid-service__num"} -->
<p class="so-grid-service__num">05</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4,"textColor":"text-dark"} -->
<h4 class="wp-block-heading has-text-dark-color has-text-color">On-prem deployment</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"text","fontSize":"small"} -->
<p class="has-text-color has-small-font-size has-text-color">Kubernetes manifests for your data centre. GPU sizing guides and migration playbooks included.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"so-grid-service","layout":{"type":"default"}} -->
<div class="wp-block-group so-grid-service"><!-- wp:paragraph {"className":"so-grid-service__num"} -->
<p class="so-grid-service__num">06</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4,"textColor":"text-dark"} -->
<h4 class="wp-block-heading has-text-dark-color has-text-color">Air-gap ready</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"text","fontSize":"small"} -->
<p class="has-text-color has-small-font-size has-text-color">Fully offline operation for defence, health, and critical infrastructure workloads.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|2xl"},"blockGap":{"left":"var:preset|spacing|lg"}}}} -->
<div class="wp-block-columns alignwide" style="margin-top:var(--wp--preset--spacing--2xl)"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"sizeSlug":"medium","linkDestination":"none","className":"so-grid-service__thumb"} -->
<figure class="wp-block-image size-medium so-grid-service__thumb"><img src="' . esc_url( $img1 ) . '" alt="AI abstract technology"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"sizeSlug":"medium","linkDestination":"none","className":"so-grid-service__thumb"} -->
<figure class="wp-block-image size-medium so-grid-service__thumb"><img src="' . esc_url( $img2 ) . '" alt="Cloud technology infrastructure"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"sizeSlug":"medium","linkDestination":"none","className":"so-grid-service__thumb"} -->
<figure class="wp-block-image size-medium so-grid-service__thumb"><img src="' . esc_url( $img3 ) . '" alt="Cybersecurity and compliance"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->',
);
