<aside class='right-off-canvas-menu'>
  <ul class='off-canvas-list' id='off-canvas-menu-container'>
    <li>
      <label>Foundation</label>
    </li>
    <li>
      <a href='#'>The Psychohistorians</a>
    </li>
    <li>
      <a href='#'>...</a>
    </li>
  </ul>
</aside>
<section class="main-section">
<header class='fixed'>
  <nav class='top-bar' data-topbar=''>
    <ul class='title-area' id='logo'>
      <li class='name'>
        <h1>
          <a href='<?php echo esc_url(home_url()); ?>'>
            <?php bloginfo('name'); ?>
          </a>
        </h1>
      </li>
      <li class='toggle-topbar menu-icon'>
        <a href='#'>
          <span></span>
        </a>
      </li>
    </ul>
    <section class='top-bar-section' id='top-menu'>
      
          <?php if (has_nav_menu('primary_navigation')) { ?>
          <?php wp_nav_menu(array('theme_location' => 'primary_navigation', 'menu_class' => 'right')); ?>
      
          <?php } ?>
    </section>
    <section class='top-bar-section closed' id='off_canvas'>
      <ul class='right'>
        <li>
          <a href='#' id='toggle-canvas-menu'>
            <i class='fa fa-bars'></i>
          </a>
        </li>
      </ul>
    </section>
  </nav>
</header>
