<?php
/**
 * Pricing — three tier cards.
 *
 * @package Sovereign_Onum
 */

return array(
	'name'        => 'sovereign-onum/pricing-three-tier',
	'title'       => __( 'Pricing Three Tier', 'sovereign-onum' ),
	'description' => _x( 'Three pricing packages with featured middle tier.', 'Block pattern description', 'sovereign-onum' ),
	'categories'  => array( 'sovereign-onum-sections' ),
	'content'     => '<!-- wp:group {"align":"full","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull"><!-- wp:paragraph {"align":"center","className":"so-eyebrow is-primary"} -->
<p class="has-text-align-center so-eyebrow is-primary">Choose your plan</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontFamily":"var:preset|font-family|red-hat-display","fontSize":"var:preset|font-size|4xl"}},"textColor":"text-dark"} -->
<h2 class="wp-block-heading has-text-align-center has-text-dark-color has-text-color">Flexible pricing for Australian firms</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"text","style":{"spacing":{"margin":{"bottom":"var:preset|spacing|2xl"}}}} -->
<p class="has-text-align-center has-text-color has-text-color" style="margin-bottom:var(--wp--preset--spacing--2xl)">Fixed AUD project pricing. 100% pilot fee credited toward production if signed within 45 days.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|lg"}}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-pricing-card","layout":{"type":"default"}} -->
<div class="wp-block-group so-pricing-card"><!-- wp:heading {"textAlign":"center","level":3,"textColor":"text-dark"} -->
<h3 class="wp-block-heading has-text-align-center has-text-dark-color has-text-color">QuickStart</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","className":"so-pricing-price"} -->
<p class="has-text-align-center so-pricing-price"><sup>$</sup>12k–18k</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","textColor":"text-muted","fontSize":"small"} -->
<p class="has-text-align-center has-text-muted-color has-small-font-size has-text-color">Pilot package</p>
<!-- /wp:paragraph -->

<!-- wp:list {"className":"so-pricing-list"} -->
<ul class="so-pricing-list"><!-- wp:list-item -->
<li>10–15 users</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>1 RAG workspace</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Live in 5 days</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>6-week engagement</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="/contact">Get Started</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-pricing-card is-featured","layout":{"type":"default"}} -->
<div class="wp-block-group so-pricing-card is-featured"><!-- wp:paragraph {"align":"center","className":"so-eyebrow"} -->
<p class="has-text-align-center so-eyebrow">Most popular</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":3,"textColor":"text-dark"} -->
<h3 class="wp-block-heading has-text-align-center has-text-dark-color has-text-color">Team Pilot</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","className":"so-pricing-price"} -->
<p class="has-text-align-center so-pricing-price"><sup>$</sup>25k–35k</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","textColor":"text-muted","fontSize":"small"} -->
<p class="has-text-align-center has-text-muted-color has-small-font-size has-text-color">Department rollout</p>
<!-- /wp:paragraph -->

<!-- wp:list {"className":"so-pricing-list"} -->
<ul class="so-pricing-list"><!-- wp:list-item -->
<li>15–30 users</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>2 workspaces + RBAC</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Full pilot-to-production</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>SSO integration</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"className":"so-btn-cyan"} -->
<div class="wp-block-button so-btn-cyan"><a class="wp-block-button__link wp-element-button" href="/contact">Choose Plan</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-pricing-card","layout":{"type":"default"}} -->
<div class="wp-block-group so-pricing-card"><!-- wp:heading {"textAlign":"center","level":3,"textColor":"text-dark"} -->
<h3 class="wp-block-heading has-text-align-center has-text-dark-color has-text-color">Production</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","className":"so-pricing-price"} -->
<p class="has-text-align-center so-pricing-price"><sup>$</sup>55k–90k</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","textColor":"text-muted","fontSize":"small"} -->
<p class="has-text-align-center has-text-muted-color has-small-font-size has-text-color">On-prem ready</p>
<!-- /wp:paragraph -->

<!-- wp:list {"className":"so-pricing-list"} -->
<ul class="so-pricing-list"><!-- wp:list-item -->
<li>30–75 users</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Production deployment</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>On-prem / air-gap path</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Annual support from $6k</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="/contact">Get Started</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->',
);
