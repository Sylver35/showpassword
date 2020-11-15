<?php
/**
*
* @package		Breizh Show Password Extension
* @copyright	(c) 2020 Sylver35  https://breizhcode.com
* @license		http://opensource.org/licenses/gpl-license.php GNU Public License
*
*/

namespace sylver35\showpassword\event;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use phpbb\template\template;
use phpbb\user;
use phpbb\language\language;

/**
* Event listener
*/
class listener implements EventSubscriberInterface
{
	/** @var \phpbb\template\template */
	protected $template;

	/** @var \phpbb\user */
	protected $user;

	/** @var \phpbb\language\language */
	protected $language;

	/**
	 * Controller constructor
	 */
	public function __construct(template $template, user $user, language $language)
	{
		$this->template = $template;
		$this->user = $user;
		$this->language = $language;
	}

	static public function getSubscribedEvents()
	{
		return [
			'core.index_modify_page_title'			=> [['show_password'], ['load_language']],
			'core.login_forum_box'					=> [['forum_show_password'], ['load_language']],
			'core.login_box_modify_template_data'	=> [['login_show_password'], ['load_language']],
			'core.ucp_login_link_template_after'	=> [['ucp_show_password'], ['load_language']],
		];
	}

	public function load_language()
	{
		$this->language->add_lang('common', 'sylver35/showpassword');
	}

	public function show_password()
	{
		$this->template->assign_vars([
			'SHOW_PASSWORD'		=> $this->not_registered(),
			'ID_CREDENTIAL'		=> 'password',
		]);
	}

	public function forum_show_password()
	{
		$this->template->assign_vars([
			'SHOW_PASSWORD'			=> true,
			'SHOW_PASSWORD_FORUM'	=> true,
			'ID_CREDENTIAL'			=> 'password',
		]);
	}

	/**
	 * @param array $event
	 */
	public function login_show_password($event)
	{
		if ($event['admin'] !== false)
		{
			$event['login_box_template_data'] = array_merge($event['login_box_template_data'], [
				'SHOW_PASSWORD'			=> true,
				'SHOW_PASSWORD_LOGIN'	=> true,
				'ID_CREDENTIAL'			=> $event['login_box_template_data']['PASSWORD_CREDENTIAL'],
			]);
		}
		else
		{
			$event['login_box_template_data'] = array_merge($event['login_box_template_data'], [
				'SHOW_PASSWORD'			=> $this->not_registered(),
				'SHOW_PASSWORD_LOGIN'	=> true,
				'ID_CREDENTIAL'			=> 'password',
			]);
		}
	}

	/**
	 * @param array $event
	 */
	public function ucp_show_password($event)
	{
		$tpl_ary = [$event['tpl_ary']];
		$event['tpl_ary'] = array_merge($tpl_ary, [
			'SHOW_PASSWORD'		=> $this->not_registered(),
			'ID_CREDENTIAL'		=> 'password',
		]);
	}

	private function not_registered()
	{
		if (!$this->user->data['is_registered'] && !$this->user->data['is_bot'])
		{
			return true;
		}

		return false;
	}
}
