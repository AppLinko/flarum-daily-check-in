import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import Stream from 'flarum/utils/Stream';

export default class checkInResultModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
  }

  className() {
    return 'checkInResultModal Modal--small';
  }

  title() {
    return (<div className="checkInResultModal successTitleText">{app.translator.trans('ziven-checkin.forum.check-in-success')}</div>);
  }

  content() {
    //
    const totalContinuousCheckIn = app.session.user.attribute("totalContinuousCheckIn");
    const lastcheckinmoney = app.session.user.attribute("lastCheckinMoney");
    const forumCheckinSuccessPromptText = app.forum.attribute("forumCheckinSuccessPromptText");
    const forumCheckinSuccessPromptRewardText = app.forum.attribute("forumCheckinSuccessPromptRewardText");
    const forumCheckinRewarMoney = app.forum.attribute("forumCheckinRewarMoney");
    const moneyExtensionExist = app.forum.attribute('antoinefr-money.moneyname')!==undefined;
    const idioms= {
      1: ["倒霉透顶"],
      2: ["时运不济"],
      3: ["平淡无奇"],
      4: ["寻常如故"],
      5: ["转运亨通"],
      6: ["幸运降临"],
      7: ["顺风顺水"],
      8: ["福气绵绵"],
      9: ["鸿运当头"],
    };


    let moneyName = "";
    let rewardText = "";
    let successTextClassName = "checkInResultModal hideText";
    let rewardTextClassName = "checkInResultModal hideText";

    if(forumCheckinSuccessPromptText!==""){
      successTextClassName = "checkInResultModal successText";
    }
    let result = [];

    if(moneyExtensionExist===true && forumCheckinSuccessPromptRewardText!==""){
      moneyName = app.forum.attribute('antoinefr-money.moneyname') || '[money]';
      rewardText = moneyName.replace('[money]', lastcheckinmoney);
      rewardTextClassName = "checkInResultModal rewardText";
      if (idioms[lastcheckinmoney]) {
        result = idioms[lastcheckinmoney];
      }
    }


    return (
      <div className="Modal-body">
        <div className={successTextClassName}>{forumCheckinSuccessPromptText.replace('[days]', totalContinuousCheckIn)}</div>
        <div className={rewardTextClassName}>您今天{result.join(", ")}，{forumCheckinSuccessPromptRewardText.replace('[reward]', rewardText)}</div>
      </div>
    );
  }
}
