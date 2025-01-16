<?php
/**
*
* @package		Breizh Show Password Extension
* @copyright	(c) 2020-2025 Sylver35  https://breizhcode.com
* @license		https://opensource.org/licenses/gpl-license.php GNU Public License
*
*/

namespace sylver35\showpassword;

/**
* @ignore
*/

/**
 * Class ext
 *
 */
class ext extends \phpbb\extension\base
{
	/**
	 * Check whether or not the extension can be enabled.
	 * The current phpBB version should meet or exceed
	 * the minimum version required by this extension:
	 *
	 * Requires phpBB 3.3.8 and PHP 7.2
	 *
	 * @return bool
	 * @access public
	 */
	public function is_enableable()
	{
		$config = $this->container->get('config');

		return phpbb_version_compare($config['version'], '3.3.8', '>=') && version_compare(PHP_VERSION, '7.2', '>=');
	}
}
