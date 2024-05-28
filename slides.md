---
title: Neural Networks and Transformers
revealOptions:
  transition: 'slide'
  incremental: false
  showNotes: false
  overview: true # press 'o' to activate
  menu: true # not sure how this works
  logo: false
  linkExternalNewWindow: true
  controlsLayout: 'edges' # or 'bottom' for default bottom right\
  slideTone: true # doesn’t seem to work

---

#### Neural Networks and Transformers

**_An introduction_**

<div style="width: 100%; font-size: 0.4em; font-weight: bold">
<p>by Keith Gibson</p>
</div>

Note:
Welcome to this tech talk on neural networks and transformers.

Today, I'm hoping to provide a baseline understanding of these concepts. As such, I'll be erring on the side of simplification.

We'll start with neural networks broadly, followed by the key characteristics of the transformer, the fundamental neural network architecture of today's most advanced language models, including the GPT series and the chatbot ChatGPT.

–––––––––––––––––––––––––––––––––––––––––––––––

**So...what is a neural network?**

Note:
Well, let's start by being more precise and instead ask -

# down

----

**What's an *artificial* neural network?**

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

**<table class="fragment" data-fragment-index="1">**
  <tr>
    <th class="fragment" data-fragment-index="1" style="font-weight: bold"></th>
    <th class="fragment" data-fragment-index="1" style="font-weight: bold">biological</th>
    <th class="fragment" data-fragment-index="14" style="font-weight: bold">artificial</th>
  </tr>
    <td class="fragment" data-fragment-index="2" style="font-size: 0.8em; font-weight: bold">input:</td>
    <td class="fragment" data-fragment-index="3" style="font-size: 0.8em">sensory</td>
    <td class="fragment" data-fragment-index="15" style="font-size: 0.8em">text</td>
  </tr>
  <tr>
    <td class="fragment" data-fragment-index="4" style="font-size: 0.8em; font-weight: bold">converted into:</td>
    <td class="fragment" data-fragment-index="5" style="font-size: 0.8em">signal</td>
    <td class="fragment" data-fragment-index="16" style="font-size: 0.8em">token</td>
  </tr>
  <tr>
    <td class="fragment" data-fragment-index="6" style="font-size: 0.8em; font-weight: bold">encoded in:</td>
    <td class="fragment" data-fragment-index="7" style="font-size: 0.8em">neuron</td>
    <td class="fragment" data-fragment-index="17" style="font-size: 0.8em">embedding</td>
  </tr>
  <tr>
    <td class="fragment" data-fragment-index="8" style="font-size: 0.8em; font-weight: bold">connected by:</td>
    <td class="fragment" data-fragment-index="9" style="font-size: 0.8em">synapse</td>
    <td class="fragment" data-fragment-index="18" style="font-size: 0.8em">element</td>
  </tr>
  <tr>
    <td class="fragment" data-fragment-index="10" style="font-size: 0.8em; font-weight: bold">layers:</td>
    <td class="fragment" data-fragment-index="11" style="font-size: 0.8em">of neurons</td>
    <td class="fragment" data-fragment-index="19" style="font-size: 0.8em">of embeddings</td>
  </tr>
  <tr>
    <td class="fragment" data-fragment-index="12" style="font-size: 0.8em; font-weight: bold">output:</td>
    <td class="fragment" data-fragment-index="13" style="font-size: 0.8em">conscious thought</td>
    <td class="fragment" data-fragment-index="20" style="font-size: 0.8em">predicted token</td>
  </tr>
**</table>**

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

lets walk through a rough comparison of biological and artificial neural networks

# next

from input all the way to output.

1. Input received
# next
  B: sensory input
# next
  A: text inputted

2. Input converted to a form that can be processed
# next
  B: chemical / electrical signal
# next
  A: token

3. it reaches the part of the network that contain the connections, which is to say
# next
  B: neuron
# next
  A: embedding

4. The connection between
# next
  B: neurons is a synapse
# next
  A: embeddings is an element, which is to say, a number.

5. layers process their inputs through successive layers
# next
    each layer's output is the next layer's input

6. The output is produced
# next
  B: conscious thought
# next
  A: a predicted token

----

**So that's the neural network**

----

**What's a Transformer? How is it different?**

Note: a transformer is a neural network, with the general architecture I just described. The difference between transformers and other text-centric neural networks is in how they process information in the intermediate layers.
# down

----

**"_multi-head attention mechanism_"**

Note:
Specifically, in the implementation of something called
# right
the multi-head attention mechanism.
which we'll explore deeper in a few slides.

–––––––––––––––––––––––––––––––––––––––––––––––

**Chatbot example (at a very high level)**

Note:
let's walk through each step of the transformer model at a macro level, using the example of a chatbot powered by GPT-2, which was released in 2019.

----

**input text:**

"The power clapper"<!-- .element: class="fragment fade-up" data-fragment-index="1" -->

Note:

----

**processing through the input, intermediate, and output layers**

Note:
we get the 1 token with the highest probability.

lets say we get -

# down

----

**<span class="fragment" data-fragment-index="1">The power clapper + </span>**
**went**
**<span class="fragment" data-fragment-index="3">straight</span>**
**<span class="fragment" data-fragment-index="5">to</span>**
**<span class="fragment" data-fragment-index="7">jial</span>**

<span class="fragment fade-in-then-out" data-fragment-index="2">are fed back in. </span>
<span class="fragment fade-in-then-out" data-fragment-index="4">are fed back in. </span>
<span class="fragment fade-in-then-out" data-fragment-index="6">are fed back in. </span>

Note:
"went"

# down

the initial input
# down
and the output
# down
are fed back in.

The process repeats, with each new word influencing subsequent predictions.

# down
(straight)
are fed back in.
# down
(to)
are fed back in.
# down
(jial)

–––––––––––––––––––––––––––––––––––––––––––––––

**Chatbot example (more detailed)**

Note:
lets walk through that in detail, using the example of a chatbot powered by GPT-2, which was released in 2019.

----

**GPT-2**
```py [1|3|4|5|6|7]
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
<div style="width: 100%; font-size: 0.4em">
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

**input:**

**"The power clapper"**

----

**tokenization:**

**"the",<!-- .element: class="fragment" data-fragment-index="1" -->**

**"power",<!-- .element: class="fragment" data-fragment-index="2" -->**

**"clap",<!-- .element: class="fragment" data-fragment-index="3" -->**

**"per"<!-- .element: class="fragment" data-fragment-index="3" -->**

Note:

Input text is broken down into tokens.
Long words are broken down into shorter tokens.

----

**tokens => embeddings**

<div style="font-size: 0.6em">
"we convert the token to a dense vector representation using the embedding matrix"<!-- .element: class="fragment fade-in-then-semi-out" data-fragment-index="1" -->
</div>

<div style="font-size: 0.6em">
=== <!-- .element: class="fragment fade-in-then-semi-out" data-fragment-index="2" -->
</div>
<div style="font-size: 0.6em">
"we look up the token in a dictionary. we get back its value: an array of numbers"<!-- .element: class="fragment fade-in" data-fragment-index="3" -->
</div>

Note:
if i were to say, "we convert the token to a dense vector representation using the embedding matrix", what might you think that means?

# down

What about if I said "we look up the value of the token in a dictionary. we get back its value: an array of numbers"?

It’s the same thing.

----

**embeddings:**

<div>"The": [ -1.228, 0.733, -0.316 ]<!-- .element: class="fragment fade-up" data-fragment-index="1" --></div>
<div>"power": [ 3.249, 0.713, 1.687 ] <!-- .element: class="fragment fade-up" data-fragment-index="2" --></div>
<div>"clap": [ 0.147, 2.198, -0.589 ] <!-- .element: class="fragment fade-up" data-fragment-index="3" --></div>
<div>"per": [ 0.673, 1.921, -2.096 ] <!-- .element: class="fragment fade-up" data-fragment-index="4" --></div>

Note:

INSERT THE array values in this slide
   - The input is split into tokens: "The", "power", "clapper",
   ----
   - Each token is mapped to its corresponding embedding vector, which is just a fancy way of saying an array of numbers.

----

```javascript
const embeddings = {
  "The": [ -1.228, 0.733, -0.316 ],
  "power": [ 3.249, 0.713, 1.687 ],
  "clap": [ 0.147, 2.198, -0.589 ],
  "per": [ 0.673, 1.921, -2.096 ]}
```
<!-- .element: class="fragment semi-fade-out" data-fragment-index="1" -->

```javascript
function selfAttention(embeddings, headNWeights, d_k) {
  const { W_Query, W_Key, W_Value } = headNWeights;
  const updatedEmbeddings =
  softmax(
    (W_Query * embeddings * transpose(W_Key * embeddings))
    / sqrt(d_k)) * W_Value * embeddings;
  return updatedEmbeddings;}
```
<!-- .element: class="fragment fade-in-then-semi-out" data-fragment-index="1" -->

```javascript
selfAttention(embeddings, headNWeights, d_k) // ->
/* The: [ -2.941, 0.483, -0.912 ],
   power: [ 2.319, 0.939, 1.034 ],
   clap: [ 0.593, 1.987, -0.349 ],
   per: [ 1.408, 2.651, -3.889 ] */
```
<!-- .element: class="fragment fade-in-then-semi-out" data-fragment-index="2" -->

Note:
   - Each array is evaluated against each other array, with the elements of each array adjusted as a result

This is where we see the unique component of the transformer first come into play.

Self-Attention Mechanism

- Each token is processed in context of every other token.
- This allows the model to find strong relationships between parts of the input regardless of their position in the input sequence.

- For humans, it's like having a long conversation where you recall every word spoken, and so can make connections between similar ideas regardless of when they took place.

----

**Heads**

<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="1">const head1embeds = selfAttention(embeddings, head1Weights, d_k)</sup></div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="2">const head2embeds = selfAttention(embeddings, head2Weights, d_k)</sup>  </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="3"> ...  </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="4"> ...  </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="5"> ...  </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="6"> ...  </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="7"> ...  </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="8"> ...  </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="9"> ...  </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="10"> ...  </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="11">const head11embeds = selfAttention(embeddings, head11Weights, d_k)</sup>  </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="12">const head12embeds = selfAttention(embeddings, head12Weights, d_k)</div>

Note:
in the case of gpt 2, that's 12 heads. So, 12 times per layer. And it happens in parallel.
The values from each head are then synthesized into a single set of embeddings yet again.

----

<div style="font-size: 0.6em; font-weight: bold">synthesize the output from all heads, returning a single set of embeddings once again</div>

```javascript
const heads = [
  head1embeds, head2embeds, head3embeds, head4embeds,
  head5embeds, head6embeds, head7embeds, head8embeds,
  head9embeds, head10embeds, head11embeds, head12embeds
];
```
<!-- .element: class="fragment fade-in-then-semi-out" data-fragment-index="1" -->


```javascript
const W_Output = ((h * d_k), d_model);
function multiHeadAttention(heads, W_Output) {
  const multiHeadOutput =
    concat(heads.join(', ')) * W_Output;
  return multiHeadOutput;
}
```
<!-- .element: class="fragment fade-in-then-semi-out" data-fragment-index="2" -->

```javascript
const outputEmbeds = multiHeadAttention(heads, W_Output);
// =>
/* The: [ 0.774, -2.616, -0.571 ],
   power: [ 2.105, 0.639, 0.896 ],
   clap: [ -2.399, -1.685, 1.412 ],
   per: [ -1.021, -1.932, -2.761 ] */
```
<!-- .element: class="fragment fade-in-then-semi-out" data-fragment-index="3" -->

----

**repeat for each intermediate layer**

<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="1">layer<sup>1 outputEmbeds</sup> => layer<sup>2 inputEmbeds</sup></div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="2">layer<sup>2 outputEmbeds</sup> => layer<sup>3 inputEmbeds</sup>  </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="3"> ... </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="4"> ... </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="5"> ... </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="6"> ... </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="7"> ... </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="8"> ... </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="9"> ... </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="10"> ... </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="11">layer<sup>11 outputEmbeds</sup> => layer<sup>12 inputEmbeds</sup>  </div>
<div style="font-size: 0.7em" class="fragment fade-in-then-semi-out" data-fragment-index="12">layer<sup>12 outputEmbeds</sup> => ... </div>

Note:
in the case of gpt 2, that's 12 layers.

----

**output layer**

**<span class="fragment fade-in" data-fragment-index="1">predictToken(layer<sup>12 outputEmbeds</sup>) </span>**

Note:

we pass the final layer's output embeddings through a prediction function to get the most likely token.
We get a 1 token output.
In this case, we get"
# down

----

**<span style="font-size: 0.65em" class="fragment" data-fragment-index="1">_repeat all prior steps until we reach the context window limit or a special stop token_</span>**

**<span class="fragment" data-fragment-index="2"> The power clap per + </span>**
**went**
**<span class="fragment" data-fragment-index="3">straight</span>**
**<span class="fragment" data-fragment-index="4">to</span>**
**<span class="fragment" data-fragment-index="5">jial</span>**

Note:
which in gpt 2 is 1024 tokens,

but for our purposes we'll use 8.

which leaves us finally with the output of "we"nt straight to jial"

–––––––––––––––––––––––––––––––––––––––––––––––

```javascript
if (output) {
  return "end talk on Neural Networks and Transformers";
}
```

Note:
Thank you everyone for your time.
I hope you enjoyed the presentation and learned something new.

–––––––––––––––––––––––––––––––––––––––––––––––

**Works Cited**

**<div style="width: 100%; font-size: 0.6em">**
**<a href="https://arxiv.org/abs/1706.03762">"Attention Is All You Need" by Vaswani et al. <a style="font-size: 0.6em"> (the Transformer whitepaper)</a></a>**

**<a href="https://github.com/openai/gpt-2/blob/master/src/model.py">GPT-2 on Github</a>**

**<a href="https://arxiv.org/abs/2005.14165">"Language Models are Few-Shot Learners" by Wu et al. <a style="font-size: 0.6em"> (GPT-3 unofficial whitepaper)</a></a>**
</div>

Note:
here are my works cited

–––––––––––––––––––––––––––––––––––––––––––––––

**github: <a href="Https://github.com/keithgibson">@keithgibson</a>**

**linkedin: <a href="Https://linkedin.com/in/keithrgibson">@keithrgibson</a>**

Note:
you can find me here
