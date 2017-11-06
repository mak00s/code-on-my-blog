---
ID: 121
post_title: アーカイブ
author: UchiboriMaiko
post_excerpt: ""
layout: page
permalink: https://concept-diagram.com/ac/
published: true
post_date: 2017-02-20 19:17:51
---
<div id="main_col">

 <?php if ( have_posts() ) : ?>

 <?php if (is_category()) { ?>
 <?php
    	$cat_id = '16';
//get_query_var('cat');
    	//echo get_category_parents( $cat_id , true, '');
      $ancestor_ids = 'ダイアグラムの描き方';
//array_reverse(get_ancestors( $cat_id, 'category' ));
      if(!empty($ancestor_ids)) {
        $cat_count = 1;
        foreach( $ancestor_ids as $ancestor_id) {
          if($cat_count == 1) {
 ?>
 <h3 class="archive_headline"><span><?php echo get_cat_name($ancestor_id); ?></span><span class="current_category"><?php echo single_cat_title('', false); ?></span></h3>
 <?php
          } else {
            break;
          };
          $cat_count++;
        }
      } else {
 ?>
 <h3 class="archive_headline"><span><?php echo single_cat_title('', false); ?></span></h3>
 <?php }; ?>

 <?php } elseif( is_tag() ) { ?>
 <h3 class="archive_headline"><span><?php echo single_tag_title('', false); ?></span></h3>

 <?php } elseif (is_day()) { ?>
 <h3 class="archive_headline"><span><?php echo get_the_time(__('F jS, Y', 'tcd-w')); ?></span></h3>

 <?php } elseif (is_month()) { ?>
 <h3 class="archive_headline"><span><?php echo get_the_time(__('F, Y', 'tcd-w')); ?></span></h3>

 <?php } elseif (is_year()) { ?>
 <h3 class="archive_headline"><span><?php echo get_the_time(__('Y', 'tcd-w')); ?></span></h3>

 <?php } elseif (is_author()) { ?>
 <h3 class="archive_headline"><span><?php _e('Author archive', 'tcd-w'); ?></span></h3>
 <?php
      global $wp_query;
      $author_id = $wp_query->query_vars['author'];
      $user_data = get_userdata($author_id);
 ?>
 <?php
       if($user_data->show_author == true) {
 ?>
 <div class="author_profile clearfix" id="author_profile_archive">
  <div class="author_info_avatar"><?php echo get_avatar($author_id, 70); ?></div>
  <div class="author_info_meta clearfix">
   <h4 class="author_info_name"><?php echo $user_data->display_name; ?></h4>
   <?php if($user_data->profile2) { ?>
   <div class="author_info_desc">
    <?php echo wpautop($user_data->profile2); ?>
   </div>
   <?php } elseif($user_data->description) { ?>
   <div class="author_info_desc">
    <?php echo wpautop($user_data->description); ?>
   </div>
   <?php }; ?>
  </div>
 </div>
 <?php }; ?>

 <?php } else { ?>
 <h3 class="archive_headline"><span><?php _e('Blog Archives', 'tcd-w'); ?></span></h3>
 <?php }; ?>

 <ol id="archive_post_list" class="clearfix">
  <?php $i = 1; while ( have_posts() ) : the_post(); ?>
  <li class="<?php if($i == 1){ echo 'post_type1'; } elseif($i > 1 and $i <= 5) { echo 'post_type2'; } else { echo 'post_type3'; };  ?> post_num<?php echo $i; ?> clearfix">
   <?php if($i==1){ ?>
   <a class="image" href="<?php the_permalink() ?>"><?php if ( has_post_thumbnail()) { echo the_post_thumbnail('size2'); } else { echo '<img src="'; bloginfo('template_url'); echo '/img/common/no_image2.gif" alt="" title="" />'; }; ?></a>
   <?php } elseif($i <= 5) { ?>
   <a class="image" href="<?php the_permalink() ?>"><?php if ( has_post_thumbnail()) { echo the_post_thumbnail('size4'); } else { echo '<img src="'; bloginfo('template_url'); echo '/img/common/no_image4.gif" alt="" title="" />'; }; ?></a>
   <?php } else { ?>
   <a class="image" href="<?php the_permalink() ?>"><?php if ( has_post_thumbnail()) { echo the_post_thumbnail('size1'); } else { echo '<img src="'; bloginfo('template_url'); echo '/img/common/no_image1.gif" alt="" title="" />'; }; ?></a>
   <?php }; ?>
   <h4 class="title"><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h4>
   <?php if($i <= 5) { ?><p class="excerpt"><?php if (has_excerpt()) { the_excerpt(); } else { if($i > 1 and $i <= 5) { new_excerpt(50); } else { new_excerpt(120); }; }; ?></p><?php }; ?>
   <?php if ($options['show_date'] && $options['show_category']) { ?>
   <ul class="meta clearfix">
    <?php if ($options['show_date']){ ?><li class="post_date"><time class="entry-date updated" datetime="<?php the_modified_time('c'); ?>"><?php the_time('Y/n/j'); ?></time></li><?php }; ?>
    <?php if ($options['show_category']){ ?><li class="post_category"><?php the_category(', '); ?></li><?php }; ?>
   </ul>
   <?php }; ?>
   <?php
     if ($options['show_bookmark']) {
       if ($i <= 5) {
       global $share_button_options;
         $share_button_options = array(
           'show_googleplus' => false,
         );
       get_template_part('share_button');
       }
     }
   ?>
  </li><!-- END .post_list -->
  <?php $i++; endwhile; ?>
 </ol>

 <?php else: ?>
 <p class="no_post"><?php _e("There is no registered post.","tcd-w"); ?></p>
 <?php endif; ?>

 <?php get_template_part('navigation'); ?>

</div><!-- END #main_col -->