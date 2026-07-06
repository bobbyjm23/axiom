<?php
/**
 * Comparison table — Sovereign Warden vs alternatives.
 *
 * @package Sovereign_Onum
 */

return array(
	'name'        => 'sovereign-onum/comparison-table',
	'title'       => __( 'Comparison Table', 'sovereign-onum' ),
	'description' => _x( 'Feature comparison table highlighting Sovereign Warden.', 'Block pattern description', 'sovereign-onum' ),
	'categories'  => array( 'sovereign-onum-sections' ),
	'content'     => '<!-- wp:group {"align":"full","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull"><!-- wp:paragraph {"className":"so-eyebrow"} -->
<p class="so-eyebrow">Why Sovereign Warden</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"style":{"typography":{"fontFamily":"var:preset|font-family|red-hat-display","fontSize":"var:preset|font-size|4xl"}},"textColor":"text-dark"} -->
<h2 class="wp-block-heading has-text-dark-color has-text-color">How we compare</h2>
<!-- /wp:heading -->

<!-- wp:html -->
<table class="so-table" style="margin-top:2rem">
<thead>
<tr><th>Capability</th><th>ChatGPT / Copilot</th><th>Build in-house</th><th>Sovereign Warden</th></tr>
</thead>
<tbody>
<tr><td>Data stays in Australia</td><td>✗</td><td>✓</td><td class="highlight">✓</td></tr>
<tr><td>Document Q&amp;A with citations</td><td>Partial</td><td>Custom build</td><td class="highlight">✓</td></tr>
<tr><td>Time to first pilot</td><td>Days</td><td>6–12 months</td><td class="highlight">5 days</td></tr>
<tr><td>On-prem / air-gap path</td><td>✗</td><td>✓</td><td class="highlight">✓</td></tr>
<tr><td>Predictable pricing</td><td>Per-seat recurring</td><td>Dev team cost</td><td class="highlight">Fixed project</td></tr>
<tr><td>ChatGPT-class UX</td><td>✓</td><td>Varies</td><td class="highlight">✓</td></tr>
</tbody>
</table>
<!-- /wp:html --></div>
<!-- /wp:group -->',
);
