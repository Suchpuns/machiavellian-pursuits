import AbsoluteCalamity from '../Resources/Cards/AbsoluteCalamity.png'; 
import GoalSwap from '../Resources/Cards/GoalSwap.png'; 
import GoalRemoval from '../Resources/Cards/GoalRemoval.png'; 
import BindingContract from '../Resources/Cards/BindingContract.png'; 
import ItsAScam from '../Resources/Cards/ItsAScam.png'; 
import Robbery from '../Resources/Cards/Robbery.png'; 
import Theft from '../Resources/Cards/Theft.png'; 
import MagicHand from '../Resources/Cards/MagicHand.png'; 
import OraclesPower from '../Resources/Cards/OraclesPower.png'; 
import TotalRenewal from '../Resources/Cards/TotalRenewal.png'; 
import AbsolutelyNot from '../Resources/Cards/AbsolutelyNot.png';
import IThinkNot from '../Resources/Cards/IThinkNot.png'; 

interface Props {
	name: string;
}

let card = new Map<string, string>();
card.set('Absolute Calamity', AbsoluteCalamity);
card.set('Goal Swap', GoalSwap);
card.set('Goal Removal', GoalRemoval);
card.set('Binding Contract', BindingContract);
card.set('Its a Scam!', ItsAScam);
card.set('Robbery', Robbery);
card.set('Theft', Theft);
card.set('Magic Hand', MagicHand);
card.set('Oracles Power', OraclesPower);
card.set('Total Renewal', TotalRenewal);
card.set('Absolutely Not', AbsolutelyNot);
card.set('I Think Not', IThinkNot);

function Card({ name }: Props) {
  return <img src={card.get(name)} alt={name} />;
}

export default Card