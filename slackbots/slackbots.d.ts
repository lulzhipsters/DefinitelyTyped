// Type definitions for slackbots
// Project: https://github.com/mishk0/slack-bot-api
// Definitions by: Lewis Hopkins https://github.com/lulzhipsters
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../Q/Q.d.ts" />

declare module Slackbots {
	type unixtimestamp = number;
	type uri = string;

	export interface Bot {
		/**
		 * Starts a Real Time Messaging API session
		 */
		login(): void;

		/**
		 * Establish a WebSocket connection
		 */
		connect(): void;

		/**
		 * Get channels
		 * @returns {vow.Promise}
		 */
		getChannels(): Q.Promise<ChannelList>;

		/**
		 * Get channel by name
		 * @param {string} name
		 * @returns {object}
		 */
		getChannel(name: string): Q.Promise<Channel>;

		/**
		 * Get channel ID
		 * @param {string} name
		 * @returns {string}
		 */
		getChannelId(name: string): Q.Promise<string>;

		/**
		 * Get users
		 * @returns {vow.Promise}
		 */
		getUsers(): Q.Promise<UserList>;

		/**
		 * Get user by name
		 * @param {string} name
		 * @returns {object}
		 */
		getUser(name: string): Q.Promise<User>;

		/**
		 * Get groups
		 * @returns {vow.Promise}
		 */
		getGroups(): Q.Promise<GroupList>;

		/**
		 * Get group by name
		 * @param {string} name
		 * @returns {object}
		 */
		getGroup(name: string): Q.Promise<Group>;

		/**
		 * Get group ID
		 * @param {string} name
		 * @returns {string}
		 */
		getGroupId(name: string): Q.Promise<string>;

		/**
		 * Get "direct message" channel ID
		 * @param {string} name
		 * @returns {vow.Promise}
		 */
		getChatId(name: string): Q.Promise<string>;

		/**
		 * Opens a "direct message" channel with another member of your Slack team
		 * @param {string} userId
		 * @returns {vow.Promise}
		 */
		//undocumented
		//openIm(userId: string): any;

		/**
		 * Posts a message to a channel by ID
		 * @param {string} id - channel ID
		 * @param {string} text
		 * @param {object} params
		 * @returns {vow.Promise}
		 */
		postMessage(id: string, text: string, params?: Slackbots.PostParams): Q.Promise<PostResponse>;

		/**
		 * Posts a message to user by name
		 * @param {string} name
		 * @param {string} text
		 * @param {object} params
		 * @param {function} cb
		 * @returns {vow.Promise}
		 */
		postMessageToUser(name: string, text: string, params?: Slackbots.PostParams, callback?: Function): Q.Promise<PostResponse>;

		/**
		 * Posts a message to channel by name
		 * @param {string} name
		 * @param {string} text
		 * @param {object} params
		 * @param {function} cb
		 * @returns {vow.Promise}
		 */
		postMessageToChannel(name: string, text: string, params?: Slackbots.PostParams, callback?: Function): Q.Promise<PostResponse>;

		/**
		 * Posts a message to group by name
		 * @param {string} name
		 * @param {string} text
		 * @param {object} params
		 * @param {function} cb
		 * @returns {vow.Promise}
		 */
		postMessageToGroup(name: string, text: string, params?: Slackbots.PostParams, callback?: Function): Q.Promise<PostResponse>;

		/**
		 * Posts a message to group | channel | user
		 * @param {string} name
		 * @param {string} text
		 * @param {object} params
		 * @param {function} cb
		 * @returns {vow.Promise}
		 */
		postTo(name: string, text: string, params?: Slackbots.PostParams, callback?: Function): Q.Promise<PostResponse>;

	}

	export interface Attachment {
		fallback: string;

		color?: string; //hex color or (good | warning | danger)

		pretext?: string;

		author_name?: string;
		author_link?: string;
		author_icon?: string;

		title: string;
		title_link?: uri;

		text?: string;

		fields?: Array<Field>;

		image_url?: uri;
		thumb_url?: uri;
	}

	export interface Field {
		title: string;
		value: string;
		short?: boolean;
	}

	export interface PostParams {
		as_user?: boolean;
		parse?: string; //full or none
		link_names?: number;
		attachments?: Array<Attachment>;
		unfurl_links?: boolean;
		unfurl_media?: boolean;
		icon_url?: uri;
		icon_emoji?: string;
	}

	export interface PostResponse {
		ok: boolean;
		ts: unixtimestamp;
		channel: string;
		message: Message;
	}

	export interface BotOptions {
		token: string;
		name: string;
	}

	export interface ChannelList {
		ok: boolean;
		channels: Array<Channel>;
	}

	export interface Channel {
		id: string;
		name: string;
		is_channel: boolean;
		created: unixtimestamp;//unix timestamp
		creator: string;
		is_archived: boolean;
		is_general: boolean;

		members: Array<string>; //users by Id

		topic: Property;

		purpose: Property;

		is_member: boolean;

		last_read: unixtimestamp;
		latest: Message;
		unread_count: number;
		unread_count_display: number;
	}

	export interface UserList {
		ok: boolean;
		members: Array<User>;
	}

	export interface User {
		id: string;
		name: string;
		deleted: boolean;
		color: string;
		profile: UserProfile;

		is_admin: boolean;
		is_owner: boolean;
		is_primary_owner: boolean;
		is_restricted: boolean;
		is_ultra_restricted: boolean;

		has_2fa: boolean;
		two_factor_type: string;//app or sms

		has_files: boolean;
	}

	export interface UserProfile {
		first_name?: string;
		last_name?: string;
		real_name?: string;

		email?: string;
		skype?: string;
		phone?: string;

		image_24: uri;
		image_32: uri;
		image_48: uri;
		image_72: uri;
		image_192: uri;
	}

	export interface GroupList {
		ok: boolean;

	}

	export interface Group {
		id: string;
		name: string;
		is_group: boolean;
		created: unixtimestamp;
		creator: string;
		is_archived: boolean;
		members: Array<string>; //user Ids
		topic: Property;
		purpose: Property;

		last_read: unixtimestamp;
		latest: Message;
		unread_count: number;
		unread_count_display: number;
	}

	export interface Property {
		value: string;
		creator: string;
		last_set: number; //unix timestamp
	}

	export interface Event {
		type: string;
		channel: string;
		user: string;
		ts: number;
	}

	export interface Message extends Event {
		subtype: string;
		text: string;
	}

}

declare module "slackbots" {

	function SlackBot(params: Slackbots.BotOptions): Slackbots.Bot

	export = SlackBot;
}