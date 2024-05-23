---
title: Neural Networks and Transformers
revealOptions:
  transition: 'slide'
---

<!-- .slide: data-background-image="assets/sponsorSlide1start_dark_highres.png" -->

–––––––––––––––––––––––––––––––––––––––––––––––

#### Neural Networks and Transformers

_An introduction_

<div style="position: fixed; width: 100%; font-size: 0.4em">
<p>by Keith Gibson</p>
</div>

Note:
Welcome to this tech talk on neural networks and transformers.

Today, I'm hoping to provide a baseline understanding of these concepts. As such, I'll be erring on the side of simplification.

We'll start with neural networks broadly, followed by the key characteristics of the transformer, the fundamental neural network architecture of today's most advanced language models, including the GPT series and the chatbot ChatGPT.

–––––––––––––––––––––––––––––––––––––––––––––––

So...what is a Neural Network?

Note:
Well, let's start by being more precise and instead ask -

# down

----

What's an *Artificial* Neural Network?

Note:
What's an *Artificial* Neural Network?

I think more precision is helpful because an 'artificial' neural network is inspired by and roughly designed after another kind of neural network. That is, the biological one, in the brain.

----

# 🧠 <span class="fragment" data-fragment-index="0"> 🤖</span>

Note:

## EDIT: say more here about the overlap between the biological and artificial neural networks, or find a better transition.

Both are networks of interconnected - you guessed it - neurons
# down

----

Note:
# DONT DELETE HIS VERTICAL SLIDE
THIS IS FOR THE EMPTY SLIDE SHOWING THE NEURONS IN THE BACKGROUND.

/take a beat

But on its own

# right


–––––––––––––––––––––––––––––––––––––––––––––––
<!-- .slide: data-background-color="#2c2c2c"-->
<!-- .slide: data-preload data-background-interactive data-background-iframe="interactive.html"-->

<table class="fragment" data-fragment-index="1">
  <tr>
    <th class="fragment" data-fragment-index="1">Biological</th>
    <th class="fragment" data-fragment-index="1">Artificial</th>
  </tr>
    <tr>
    <td class="fragment" data-fragment-index="2">sensory input</td>
    <td class="fragment" data-fragment-index="3">text inputted</td>
  </tr>
  <tr>
    <td class="fragment" data-fragment-index="4">chemical / electrical signal</td>
    <td class="fragment" data-fragment-index="5">token</td>
  </tr>
  <tr>
    <td class="fragment" data-fragment-index="6">neuron</td>
    <td class="fragment" data-fragment-index="7">embedding</td>
  </tr>
  <tr>
    <td class="fragment" data-fragment-index="8">synapse</td>
    <td class="fragment" data-fragment-index="9">element</td>
  </tr>
  <tr>
    <td class="fragment" data-fragment-index="10">layers<sup>n</sup> (of neurons)</td>
    <td class="fragment" data-fragment-index="11">layers<sup>n</sup> (of embeddings)</td>
  </tr>
  <tr>
    <td class="fragment" data-fragment-index="12">involuntary action / conscious thought</td>
    <td class="fragment" data-fragment-index="13">a token predicted</td>
  </tr>
</table>

Note:
in a vacuum, what meaning does one neuron have? What can it accomplish?

Well, none, nothing.

It is only in _relation_

# click

to other neurons,

only when _connected_

# click

to other neurons,

that it can take on meaning, that it can accomplish something.

lets walk through a rough comparison of biological and artificial neural networks from input all the way to output.
# click

1. Input received

  B: sensory input

  A: text inputted

# click

2. Input converted to a form that can be processed

  B: chemical / electrical signal

  A: token

3. it reaches the part of the network that contain the connections, which is to say

  B: neuron

  A: embedding

4. The connection between
 B: neurons is a synapse
 A: embeddings is an element, which is to say, a number.

5. layers process their inputs through successive layers
    each layer's output is the next layer's input

6. The output is produced

  B: conscious thought / involuntary action
  A: a predicted token

–––––––––––––––––––––––––––––––––––––––––––––––

Okay. What's a Transformer?

multi-head attention mechanism<!-- .element: class="fragment fade-up" data-fragment-index="1" -->

Note: a transformer is a neural network, with the general architecture I just described. The difference between transformers and other text-centric neural networks is in how they process information in the intermediate layers.

Specifically, in the implementation of something called
# click
the multi-head attention mechanism.
which we'll explore deeper in a few slides.

–––––––––––––––––––––––––––––––––––––––––––––––

Chatbot example (at a very high level)

Note:
let's walk through each step of the transformer model at a macro level, using the example of a chatbot powered by GPT-2, which was released in 2019.

----

input text:

"The power clapper"<!-- .element: class="fragment fade-up" data-fragment-index="1" -->

Note:

----

processing through the input, intermediate, and output layers

Note:
we get the 1 token with the highest probability.

lets say we get -

# down

----

"went"


Note:
"went"

----

<span class="fragment" data-fragment-index="1"> "The power clapper"  </span>
<span class="fragment" data-fragment-index="2"> + "went  </span>
<span class="fragment" data-fragment-index="4">straight</span>
<span class="fragment" data-fragment-index="6">to</span>
<span class="fragment" data-fragment-index="8">jial"</span>

<span class="fragment fade-in-then-out" data-fragment-index="3">are fed back in. </span>
<span class="fragment fade-in-then-out" data-fragment-index="5">are fed back in. </span>
<span class="fragment fade-in-then-out" data-fragment-index="7">are fed back in. </span>

Note:
the initial input
# click
and the output
# click
are fed back in.

The process repeats, with each new word influencing subsequent predictions.

# click
(straight)
are fed back in.
# click
(to)
are fed back in.
# click
(jial)

–––––––––––––––––––––––––––––––––––––––––––––––

Chatbot example (more detailed)

Note:
lets walk through that in detail, using the example of a chatbot powered by GPT-2, which was released in 2019.

----

## GPT-2
```py [1|1,3|1,4|1,5|1,6|1,7|1,3-7]
# The model's own (hyper)parameters
    return HParams(
        n_vocab=0,
        n_ctx=1024,
        n_embd=768,
        n_head=12,
        n_layer=12,
    )
```
<br>
<div style="position: fixed; width: 100%; font-size: 0.4em">
  <a href="https://github.com/openai/gpt-2/blob/master/src/model.py">GPT-2 on Github</a>
</div>

Note:
  n_vocab=0
    this is the number of unique tokens in the dataset.
    it says 0 here because it's open to be set by us.
    the version trained by openAI was 50257.

  n_ctx=1024
    the maximum number of tokens in the context window, meaning the conversation.

  n_embd=768
    the number of elements (elements) per embedding.

  n_head=12
    the number of attention heads in each layer
    this is the number of times the model will split the input sequence
    and calculate attention weights.

  n_layer=12
    the number of transformer layers.
    this is the number of times the model will apply the transformer
    to the input sequence.

----

input:

"The power clapper"

----

tokenization:

"the",<!-- .element: class="fragment" data-fragment-index="1" -->

"power",<!-- .element: class="fragment" data-fragment-index="2" -->

"clap",<!-- .element: class="fragment" data-fragment-index="3" -->

"per"<!-- .element: class="fragment" data-fragment-index="3" -->

Note:

Input text is broken down into tokens.
Long words are broken down into shorter tokens.

----

embeddings:

<br>

<div style="font-size: 0.6em">
"we convert the token to a dense vector representation using the embedding matrix"<!-- .element: class="fragment fade-in-then-semi-out" data-fragment-index="1" -->
</div>

<br>
<div style="font-size: 0.6em">
"we look up the array of (numeric) values for each token in a database"<!-- .element: class="fragment fade-in" data-fragment-index="2" -->
</div>

----

embeddings:

"The":<!-- .element: class="fragment fade-up-then-out" data-fragment-index="3" -->
<div style="font-size: 0.1em">
  [ -1.228084989880871, 0.7331303424681268, -0.31621513108079213, 3.1979479873077885,
  2.168531500398558, -0.24906143658303126, -1.5775041584541172, -2.5750147547274893,
  1.8264231424899657, 4.448246216443945, 4.616339993884374, -1.3465269175726058,
  3.7748507178965482, -3.8642399003090744, 4.062521558695886, -2.517490635540278,
  -2.3333924086374713, 3.5648055400233147, -2.6021759100785458, -1.135771848261835,
  -2.9654474015943855, -4.869958955438847, -2.650808042923687, 3.4223173974162684,
  -3.2136943656022066, 3.7986100981683144, -0.744268146989775, -4.330353006224592,
  -0.11111378230988844, 3.313439752993496, 2.228278000808473, 4.9385423385824865,
  -1.000830973374407, -4.050927756937563, -1.3952706641265378, -2.8959900801266025,
  -4.1606265450539155, -3.3955732427902796, -2.800161814783142, 3.7665116096857894,
  1.1209109637733583, -2.565782952316793, -3.9523509507958465, 2.004507294942826,
  -3.8758543633225995, 2.558028022387142, 2.900713793806733, 1.4453311927773882,
  -3.491279734921988, -2.0888390713429605, 2.068676766583099, -1.0860972373932043,
  -0.588063447701634, 2.6480768203751115, 2.1802425613048566, -3.534460879770114,
  1.9444991814782338, -3.469153999118253, -2.9688231412686794, 3.5144672413193128,
  -1.4507690777164939, 1.6708387894703343, -2.828568483001377, 2.927868774366531,
  1.882428290891001, -3.2226844516964226, 0.603798712731896, 0.6768682009967915,
  -1.0538763034175602, 3.317085656965224, -3.6496036337093107, -4.832416837142426,
  -4.104887022666206, -4.342720497152839, -0.2933567842991991, 4.677994993680381,
  4.6764450894814615, 0.12852253036618144, -2.848449629207639, 0.9330703492115244,
  2.8513162212161287, -1.749561968414981, 0.4042781217372564, 4.546375484426687,
  -4.887549295771008, 2.2757700679690256, 4.166888380692251, -1.213638558983372,
  -2.400714416130938, 2.7333341893584233, 3.0593041010927813, -0.8024652262126271,
  -2.4045718864962096, 1.472637116504849, -1.0788720676734376, -3.6910761878087928,
  0.8469579382851293, -1.42854340721829, -2.8302002265829906, -1.3524363118904015,
  3.692882900992032, -2.178818398114224, 3.139465827459194, -2.647686431328422, -1.094284580997582,
  4.034392500825906, 4.947139593394139, 4.5807777934306095, -4.826919960045261, 4.236861604078072,
  -1.6210904782827096, 3.1924419631666705, 3.762414936953091, -4.414964620615461,
  0.7532209059618182, 0.7363677742940222, -1.6814692812158238, 1.8441014415371182,
  1.8773451997356805, 2.038437924744203, -3.767566552039072, 1.8443596576364545,
  -4.928776391728949, -4.144488894325107, 0.9336799561166504, 3.8679556596084943,
  3.833924041933061, 4.785356501275167, -1.96990688700182, -3.1154054068984904, 4.456052257445746,
  -4.186934423684181, 1.5254035676343358, -2.7412336596313502, 1.412918842180808,
  -3.1543639917895794, -3.196521227960585, -1.0918743671116449, -3.4741635007855853,
  -4.313954922476794, 0.3608986718356473, 3.1992546156801343, 1.2287649870168753,
  2.964202786977486, -2.5268728479353686, -2.8002955909630534, 2.837741149804838,
  4.4839024643326475, 0.1738724025153644, 4.562796961768996, 0.9712754580075806,
  0.924708823440243, -1.7496831888966113, 3.283907252050909, -0.41372543992190103,
  3.5560196379284683, -0.02536080206953617, 0.2448488868963583, -0.25773107779995463,
  1.841221228252465, 2.3540036847241534, 2.2976334844201123, -1.6725178634072613,
  0.4596333402706998, -4.204776535311748, -1.2177381969546985, -4.830091648835209,
  -3.511337923868718, 2.23625613132842, -1.2437188669905241, 3.576509964655539, 4.895768495964074,
  -0.8438047173338781, 4.665699453390268, -3.7928730065979788, -2.60942717714836,
  4.760503592181278, 0.7625417011458762, -1.39045332448003, 4.036897610543765, 4.4933358217607395,
  -0.9327465470303657, -2.063979133064582, -2.2690184094344024, 1.1632365874384636,
  3.761675620376767, 2.550743505259221, 2.0420808590803974, 4.853035850512121, -4.806687475486298,
  -1.9321707343794614, -0.04455661109342035, -3.0209386209879208, -3.624052483150244,
  -2.91928035751551, -0.5152340014675332, 0.13230534693042362, -4.915669022509781,
  -0.6373811564637988, -2.3575434920373994, -4.439965326502473, -2.704691331872906,
  3.9430079627397614, 2.5236166951211425, -4.3127426973259775, -2.5566960146759476,
  0.9874793436746181, 0.3006221376130602, -0.234130150852911, -0.05569158527966955,
  -2.0525523279689395, 4.791885387592378, -1.9578492817313875, 2.5203424309457905,
  -0.1767492754566664, -0.5451169145965595, 4.429659806556938, -4.636582685047658,
  -4.843766708725568, -1.723500074248745, 3.653264705082808, -1.5528585466064015,
  -2.329942277226993, -3.574377037081542, -3.5895272891668117, -1.4321692511390127,
  3.5631902724350617, 1.5373815932748647, -2.161103241376492, 1.022013270463777,
  -3.5769407392137564, -0.07778435818975193, -4.688738148618277, -3.4767694815808547,
  -2.5269340059063916, 1.3187440878267243, -2.1793236270579874, -0.2542632047916227,
  -3.120392554736342, 4.789317492267953, 3.4585286027278688, 4.274536145369288, 0.347273037908737,
  1.0391390280769013, -0.3671319555720265, -3.079761428891703, 0.5406854040986664,
  3.942124061656127, 0.19398919210419407, -3.554533398173889, 4.311199559231314,
  -0.7477180309201419, -3.745061593831609, 3.312543147306945, -3.253545945758738,
  2.971368080067041, -2.823991966134254, -1.6453365317121005, -0.23360479476551355,
  3.971661079133998, -3.6140361576165114, -4.799225609967264, 0.25836184980836396,
  -0.41374210808905243, 4.684300441844957, 2.324263122927512, -3.6332006073268475,
  3.376764427166883, 0.08161480818947453, 1.3651489773043242, -2.122053609773109,
  -0.14325667618140514, -2.8971612445275885, -3.5887415072469353, -3.4924862189958894,
  4.838803975888059, 4.416748491817469, -1.6350348437361872, -0.17428772180872354,
  -4.854662203779188, -1.9714579465230342, -4.652610687277865, 2.446506003656568,
  3.2399682919801425, -0.3441857016797867, 1.6346586314028926, 1.1525681773794316,
  1.5895075952263689, 3.1802104615836946, 3.2584889731473847, -1.9484349521056865,
  -1.4943554774310353, -4.370300733736709, 1.5639160549801545, 4.477978431087227,
  -2.1937964973545987, -0.7134165205836496, 4.052983288047843, -3.297599992189333,
  0.6963054720529449, 3.1744747376790023, 4.363169293595012, 0.49880706797350527,
  -2.650718245077066, 0.2685263298772451, 2.52885517793114, -2.144961285155098, 3.6514584199474953,
  1.7944135959884555, 0.4775690877453975, 2.1385366814701285, 0.45887075934919963,
  2.8993630000514514, -3.751469410772419, -1.3555639585801327, -3.6442895230975036,
  -4.051316493686208, 2.4696547061602185, 1.9571150346404291, -3.432577676080384,
  -3.304499753912178, 0.2571851286233713, 3.3521073690431713, 4.286280567750612,
  -3.0471527130250164, 2.7183736573342854, -3.8240684082140364, -4.30479909173672,
  -4.59319946478888, 3.535694783306111, -4.14120224730409, 4.632720024804495, -2.634118944593966,
  3.1039965408814947, -2.498089429360628, -1.480159957990892, -2.8253600851769867,
  0.07519236003353846, -2.9234474737357985, -3.6274533350769222, 4.9537645692735275,
  1.5661566978902508, -0.6345054832021901, -0.24064810013882276, -1.377172122414796,
  0.5237479880462175, -2.4877386469088836, 4.865133993816258, -4.938261819611796,
  -2.341502043009678, -2.147769869218139, -1.236921039536929, 3.9856920361015042,
  2.149141064615505, -3.293346787164806, -1.4244213363324376, -3.788486201161756,
  -1.2613070616707178, 4.313368463375223, 3.810010330360205, 3.649177339655674, 2.012650442274147,
  4.108045733436178, 2.8307385130719602, 0.3527196140657818, -1.5689419645426916,
  4.252099031741379, -2.1854484686188824, -4.837964023713061, 1.3822566684846578,
  -1.5163993909408968, -4.7909164471163805, 0.34530500246458207, 3.2515101073951787,
  3.2932574285491807, -2.577656240014765, 2.350447580214656, 3.119006519847252, -1.1467837479888598,
  -4.798003843328383, -3.084814145534971, -1.8344349919548253, 2.688724570223771,
  0.3928710512259226, 2.8209370697191494, -2.3296343982417467, -4.204863793264759,
  0.6958934750435279, -4.676646525968431, -1.1165523762342655, -1.3966641245627165,
  0.06548016785724187, -1.7234533352404302, -4.4118835159654495, -4.620030721026859,
  3.055757025983599, -3.3345807477234457, 4.06187774329439, -4.155759994078425, -4.966613116019447,
  0.2726001466461847, -1.2149442416978062, 1.1926644695531525, -3.6900021140752726,
  -0.728649113554285, 0.2334627936154714, -4.955275163377766, 3.082665550570221,
  1.1116448963494596, 1.7267572817872168, -0.2471062078672226, -3.5835159483472734,
  1.2236473091778084, 4.319101970207653, -4.860901300321454, -3.0698897109062195,
  2.655359437276541, 3.245941556740588, 0.031120256340440022, 2.360953016395615,
  2.9303085419679586, 2.2028802463737502, -1.7435779918097905, -2.7999629666034043,
  0.17905108445521556, -4.045124479038873, 3.5336318918233474, -2.5881981862352865,
  2.328173352041185, 3.9381162959856457, 0.7121024162147531, 1.0150741743265579,
  -3.818777697234619, 3.045714247146414, -0.6099037655871946, 3.394383692643416,
  -2.703496681978106, -3.1454804384246104, -4.664918048648707, 0.3901167869936062,
  -3.8024024675628154, -0.9181463757222597, 0.6278871314968963, -1.9540170319961248,
  -3.710170998571718, 1.2170504957449424, -0.9373261492062213, -2.34318768993087,
  4.353956894275182, 1.8352902194271365, 3.6067528922423513, 1.6566203198112728,
  0.23959629295691443, -4.406190945421424, 3.868647115750006, 1.5966025222779638,
  -3.9217802123139323, 3.511661787690155, 0.7408777649690883, -2.247162994868308,
  4.706359118943531, 1.6243387367010564, 3.065670279717775, -3.304224850013193, 3.0551483255846854,
  2.4081484646227747, 0.41746970848002274, -3.369111871401398, 2.798879615896846,
  -2.7048601738426936, -4.512889454490773, -3.2320784219446974, -0.0465758146900459,
  0.0038168746261346698, -4.568116712146255, -2.1374621879516376, 4.712839997077804,
  -0.029049149593758372, 1.801449255912595, 3.0294300467654587, -1.4602849210945212,
  0.6984186495753768, -3.8175429905467495, 1.4393009780300847, -4.625862003041592,
  -0.4054273348605175, -4.93813659742081, -4.68478502657713, -0.5809527978265301,
  3.7162037476787013, 3.7799612375627625, -3.137826843645384, -0.2887526529152922,
  -3.668533018106066, -2.9020947998880287, 0.5059022983598176, 3.484417649243145,
  3.1476634989061942, 1.1666912793951667, -0.31740399736955194, -0.23265771547930747,
  -3.282958091579793, -4.361360959469131, -1.2980587528594034, -4.457881136393413,
  -1.2456927298298326, -4.910501913576521, 3.062579241530498, 4.514470397226507,
  4.441624638863891, 2.0713993494012772, -1.6705392974761946, -2.155011105779745,
  3.4220418821064413, 3.6359825839977447, 2.4589165509078033, -3.840673573796154,
  3.9477363522872153, 4.104443870905799, -2.234161743777745, -3.8197175323945376,
  2.0974241815686634, -4.675184917462896, -4.509550698868237, 3.5435400829092565,
  3.3321070832224073, 1.3881107254318543, -0.07422919912869475, 3.154932322592252,
  -1.4031458516249495, 1.8355371159370115, 4.215033171038469, 3.563663503741024,
  4.541015349724436, 0.0492688188359347, -1.8389318624163309, 0.31452935952354544,
  1.7934244360391638, 3.6926209711925715, -0.10988467253906009, 1.8555737107959818,
  -3.528103870317909, 3.6003903579926266, 4.902023100151618, 0.925892251063896, -4.715654339938526,
  2.798018862190572, -0.4387036518359828, -3.188131316420928, 1.8238581307469692,
  -3.9617382429650894, -1.5008772270982873, -1.5519248169780786, 1.8771895107203163,
  -1.7240348663791738, 3.3625152231230615, -1.9888749306074982, -3.695354785751086,
  3.0385823628281763, 0.6925815208007187, 4.30473887479641, 3.6106439116684275, -0.5994042615457058,
  0.11359713100602242, -0.6900446298454543, -2.1592466346079386, 4.607083588425148,
  1.2590266645318788, -3.5724896879277646, -1.469001924478932, -4.2634768215574415,
  4.783571599034982, -4.103070505205711, 2.8265668678755107, 1.6432398032952893,
  -1.6054472854800572, -3.893934634263363, 1.01104477114641, -0.6842280375193415,
  1.5179816692836567, -0.7076672964156039, -1.2448672432262797, -1.4187391548017358,
  0.20064204315455303, -4.418434126128186, -0.3742802251704269, -4.595063390048404,
  1.377076951142067, -3.5675602512683557, -4.274963636913296, 1.2181277994249085,
  3.235440698682069, 1.9050168861627164, -2.7027805482748013, -1.5787436178931125,
  3.6491545298789276, -3.2653347841077474, 0.33157166791740966, -4.264209611520686,
  -1.897590357087795, 2.9048271099029765, -3.073306435755594, 2.899204721753936,
  2.6211276298877078, 0.38852394012506064, 0.8456467059621957, -3.607061803396563,
  0.2166833891999893, 1.1153724540994396, -2.0783861549966742, 0.3832010903273435,
  -3.131544679323186, 2.363366012480008, -2.9429711767519584, -4.591450585557397,
  -2.819046932116942, -0.5485328457623613, -2.7657228751451535, -2.373342458275254,
  3.74367791159235, 1.6044523845311742, 1.2968562169278464, -4.931023074788364, -0.9347357931743039,
  2.148897493410031, -1.9103961436219197, 0.019002521438582498, -1.4475350566948886,
  0.7434002009262102, -3.911913846748636, 1.9731500482597504, -3.653292008088993,
  3.5601297572628354, -0.28721152805444916, 3.2513564113894695, 2.781113892191822,
  -4.224057161128911, 3.379219781728766, -4.239572481440261, 4.32660003758734, 4.13434038120451,
  -3.705335677647419, -2.357662267335101, -1.5652904406691182, 2.613483474976226,
  2.077537924726527, 1.827194509358745, 2.7668844034799323, 1.6292414146107381, 1.0213267303517366,
  -2.8106271679934336, 2.4427212617926024, -4.32156849720397, -4.883844045982668,
  -3.3666619916196927, 1.456376977177289, 1.4380051581411628, -1.9658633498310119,
  -4.0239942748901925, 3.732971599102992, -2.1910613751068952, -0.860291786930258,
  2.690436742000779, 2.9402475355269253, -3.2630179644498924, 4.413033834634433,
  -1.5823739210542698, -3.714716996111358, 3.3035154782404135, -4.573435789840394,
  -1.1723199508725934, -2.8325303065845975, -2.1224628427490666, -1.4647839761372206,
  0.11608310892518237, -3.9382544004448805, 1.3541093258484853, 0.9728446085706128,
  1.78499967572664, -2.6319801351455063, -0.4496051123693867, 0.7794342706304747,
  3.0168344578531343, -4.19274891542158, 2.5628520177771623, 3.389878291455661, 3.2573816378061426,
  1.9039186327788116, 0.9559988773091854, 2.159745244110942, -2.7524911298961774,
  -2.7477375072437082, 4.484095512523021, -2.7255941119172977, -0.7444970122783996,
  -3.724344417544272, 1.9678354180495088, -1.0096788921694833, 1.9119899194004741,
  -2.6287020259678906, -4.016671677037344, -3.800807915762743, 0.8961004830778796,
  -3.1138447297605776, -3.806028700616335, -3.542805856193534, -4.67859124809487,
  0.21780450313241317, 3.703878314572604, 3.821208153683319, 2.559913390062829, 3.7315177911069526,
  -2.1638401291150733, 1.8443980448302515, 3.3947338969248086, 1.4979444422369737,
  -4.245230686263184, -3.590897838140361, -2.1652299174243206, -0.5551205701610451,
  -2.0831555689110415, 0.06329861929615, 3.6613191224698483, -0.43568592059094513,
  -2.123415615609683, 4.655867564941094, 2.504445903727504, -3.2040713968259404,
  0.8587067952435312, -4.698443712072049, 4.376256923636419, -4.276586895776577,
  4.039180306346299, -0.6844489481268408, -4.466900207467814, -4.431402174201294,
  0.3244370752849557, 0.6301392190205934, 0.5929870496341039, 2.6915918099995695,
  -3.420935405210519, -0.7315090083355518, 1.2945205326445297, -2.6971793613191553,
  1.7346515866027374, -3.899436543159003, 3.029736866217805, -4.06396296651959, -2.928717213218195,
  -1.0902639902090772, -0.8732924205036108, -2.445397019186215, -1.0826166880372057,
  2.4450667003612896, -0.7750586095797374, 2.0698778622705882, 2.2179512682903013,
  1.1323005742102836, 4.033599810095321, 3.4066255974841013, 3.446464428226861, 3.8875149774349094,
  0.8587225445839897, 4.490651509465419, 1.9132361931576902, -4.04632526265493, -3.810959202805988,
  -0.7528097432783909
]</div> <!-- .element: class="fragment fade-up-then-out" data-fragment-index="3" -->

"power": [ 3.249, 0.713, 1.687 ] <!-- .element: class="fragment fade-up" data-fragment-index="4" -->

"clap": [ 0.147, 2.198, -0.589 ] <!-- .element: class="fragment fade-up" data-fragment-index="5" -->

"per": [ 0.673, 1.921, -2.096 ] <!-- .element: class="fragment fade-up" data-fragment-index="6" -->

Note:
if i were to say, "we convert the token to a dense vector representation using the embedding matrix", what might you think that means?

# down

What about if I said "we look up the array of numeric values for each token in a database"?

It’s the same thing.


INSERT THE array values in this slide
   - The input is split into tokens: "The", "power", "clapper",
   ----
   - Each token is mapped to its corresponding embedding vector, which is just a fancy way of saying an array of numbers.


----

<div style="font-size: 0.5em">
const embeddingsLayer1 = {

  "The": [ -1.228, 0.733, -0.316 ],

  "power": [ 3.249, 0.713, 1.687 ],

  "clap": [ 0.147, 2.198, -0.589 ],

  "per": [ 0.673, 1.921, -2.096 ]

}</div>

self-Attention Mechanism (sam)<!-- .element: class="fragment fade-up" data-fragment-index="1" -->

sam(embeddingsLayer1["The"])<!-- .element: class="fragment fade-up" data-fragment-index="2" -->

sam(embeddingsLayer1["power"])<!-- .element: class="fragment fade-up" data-fragment-index="3" -->

sam(embeddingsLayer1["clap"])<!-- .element: class="fragment fade-up" data-fragment-index="4" -->

sam(embeddingsLayer1["per"])<!-- .element: class="fragment fade-up" data-fragment-index="5" -->


Note:
   - Each array is evaluated against each other array, with the elements of each array adjusted as a result

This is where we see the unique form of the transformer first come into play.

Self-Attention Mechanism (SAM)

- Each token is processed in context of every other token.
- This allows the model to find strong relationships between parts of the input regardless of their position in the input sequence.

- For humans, it's like having a long conversation where you recall every word spoken, and so can make connections between similar ideas regardless of when they took place.

----

Heads:

<div style="font-size: 0.3em">
const Head1 = sam(embeddingsLayer1["The"]), sam(embeddingsLayer1["power"]), sam(embeddingsLayer1["clap"]), sam(embeddingsLayerN["per"])<!-- .element: class="fragment" data-fragment-index="1" -->
</div>

<div style="font-size: 0.3em">
const Head2 = sam(embeddingsLayer1["The"]), sam(embeddingsLayer1["power"]), sam(embeddingsLayer1["clap"]), sam(embeddingsLayerN["per"])<!-- .element: class="fragment" data-fragment-index="2" -->
</div>

<div style="font-size: 0.3em">
const Head3 = sam(embeddingsLayer1["The"]), sam(embeddingsLayer1["power"]), sam(embeddingsLayer1["clap"]), sam(embeddingsLayerN["per"])<!-- .element: class="fragment" data-fragment-index="3" -->
</div>

<div style="font-size: 0.3em">
const Head4 = sam(embeddingsLayer1["The"]), sam(embeddingsLayer1["power"]), sam(embeddingsLayer1["clap"]), sam(embeddingsLayerN["per"])<!-- .element: class="fragment" data-fragment-index="4" -->
</div>

<div style="font-size: 0.3em">
etc. <!-- .element: class="fragment" data-fragment-index="5" -->
</div>

Note:
in the case of gpt 2, that's 12 heads. So, 12 times per layer. And it happens in parallel.
The values from each head are then synthesized into a single set of embeddings yet again.

----

repeat for each intermediate layer

<span class="fragment fade-up-then-out" data-fragment-index="1">layer<sup>n output</sup> => layer<sup>n+1 output</sup>  </span>

<span class="fragment fade-up-then-semi-out" data-fragment-index="2">layer<sup>n+1 output</sup> => layer<sup>n+2 input</sup>  </span>

<span class="fragment fade-up-then-semi-out" data-fragment-index="3">layer<sup>n+2 output</sup> => layer<sup>n+3 input</sup>  </span>

<span class="fragment fade-up" data-fragment-index="4">etc.</span>

Note:
in the case of gpt 2, that's 12 layers.

----

output layer:

<span class="fragment fade-up-then-out" data-fragment-index="1">predictToken(embeddingsLayer<sup>n final output</sup>) => </span>

"went"<!-- .element: class="fragment" data-fragment-index="2" -->

Note:
we pass the final layer's output embeddings through a prediction function to get the most likely token.
We get a 1 token output.
In this case, we get
# click

"went"

----

repeat until we reach the context window limit

Note: which in gpt 2 is 1024 tokens,

but for our purposes we'll use 7.

----

Input:

"The power clapper"

Output:<!-- .element: class="fragment" data-fragment-index="1" -->

"went straight to jial"<!-- .element: class="fragment" data-fragment-index="2" -->

Note: which leaves us finally with the output of "went straight to jial"

–––––––––––––––––––––––––––––––––––––––––––––––

if (output) {

  return "end talk";

}

Note:
Thank you everyone for your time.
I hope you enjoyed the presentation and learned something new.

–––––––––––––––––––––––––––––––––––––––––––––––

Works Cited
<div style="width: 100%; font-size: 0.6em">
  <a href="https://arxiv.org/abs/1706.03762">"Attention Is All You Need" by Vaswani et al. (transformer whitepaper)</a>
</div>
<div style="width: 100%; font-size: 0.6em">
  <a href="https://github.com/openai/gpt-2/blob/master/src/model.py">GPT-2 on Github</a>
</div>
<div style="width: 100%; font-size: 0.6em">
  <a href="https://arxiv.org/abs/2005.14165">"Language Models are Few-Shot Learners" by Wu et al.
   (GPT-3 unofficial whitepaper)</a>
</div>

Note:
here are my works cited

–––––––––––––––––––––––––––––––––––––––––––––––

linkedin: @keithrgibson

github: @keithgibson

Note:
you can find me here

–––––––––––––––––––––––––––––––––––––––––––––––

<!-- .slide: data-background-image="assets/sponsorSlide2end_dark_highres.png" -->

Note:
And lastly, thank you again to Remake and the rest of our sponsors.
