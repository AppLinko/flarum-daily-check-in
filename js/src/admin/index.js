import {extend, override} from 'flarum/extend';

app.initializers.add('shentx-checkin', () => {
  app.extensionData
    .for('ziiven-daily-check-in')
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('shentx-checkin.admin.settings.reward-money')}</label>
          <div class="helpText">{app.translator.trans('shentx-checkin.admin.settings.reward-money-requirement')}</div>
          <input type="number" className="FormControl" step="any" bidi={this.setting('shentx-forum-checkin.checkinRewardMoney')} />
        </div>
      );
    })
    .registerSetting({
      setting: 'shentx-forum-checkin.checkinTimeZone',
      label: app.translator.trans('shentx-checkin.admin.settings.timezone'),
      type: 'number',
    })
    .registerSetting({
      setting: 'shentx-forum-checkin.autoCheckIn',
      label: app.translator.trans('shentx-checkin.admin.settings.auto-check-in'),
      type: 'switch',
    })
    .registerSetting({
      setting: 'shentx-forum-checkin.autoCheckInDelay',
      label: app.translator.trans('shentx-checkin.admin.settings.auto-check-in-delay'),
      type: 'number',
    })
    .registerSetting({
      setting: 'shentx-forum-checkin.checkinSuccessPromptType',
      label: app.translator.trans('shentx-checkin.admin.settings.check-in-success-prompt-type'),
      type: 'select',
      options: {
        0: app.translator.trans('shentx-checkin.admin.settings.None'),
        1: app.translator.trans('shentx-checkin.admin.settings.Alert'),
        2: app.translator.trans('shentx-checkin.admin.settings.Modal')
      },
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('shentx-checkin.admin.settings.check-in-success-prompt-text')}</label>
          <div class="helpText">{app.translator.trans('shentx-checkin.admin.settings.check-in-success-prompt-example-text')}</div>
          <input type="string" className="FormControl" step="any" bidi={this.setting('shentx-forum-checkin.checkinSuccessPromptText')} />
        </div>
      );
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('shentx-checkin.admin.settings.check-in-success-prompt-reward-text')}</label>
          <div class="helpText">{app.translator.trans('shentx-checkin.admin.settings.reward-money-requirement')}</div>
          <div class="helpText">{app.translator.trans('shentx-checkin.admin.settings.check-in-success-prompt-example-reward-text')}</div>
          <input type="string" className="FormControl" step="any" bidi={this.setting('shentx-forum-checkin.checkinSuccessPromptRewardText')} />
        </div>
      );
    })
    .registerPermission(
      {
        icon: 'fas fa-id-card',
        label: app.translator.trans('shentx-checkin.admin.settings.allow-check-in'),
        permission: 'checkin.allowCheckIn',
      },
      'moderate',
      90
    )
});
