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
I think more precision is helpful because an 'artificial' neural network is inspired by another neural network. That is, the biological one, in the brain.

----

Okay okay...what's a *Biological* Neural Network?


Note:
# down

The biological neural network is an interconnected network of - you guessed it -
neurons

–––––––––––––––––––––––––––––––––––––––––––––––
<!-- .slide: data-background-color="#2f2f2f"-->
<!-- .slide: data-background-interactive data-background-iframe="interactive.html"-->

Note:
on its own, what meaning does one lone neuron have? What can it accomplish?

Well, none, nothing.

It is only in _relation_

# click

to other neurons,

only when _connected_

# click

to other neurons,

that it can take on meaning, that it can accomplish something.

----

Synapse

Note:

In biological networks, this connection between neurons is called a synapse.
In artificial networks, we can liken this connection to what is called a dimension.

It takes the form of a chemical or electrical signal that, when fired, then causes another neuron to fire. And another, and another. Until you get a network that might vaguely be resembled by something like, this:

/click

help: fill in talking here about the layers of biological neural networks

–––––––––––––––––––––––––––––––––––––––––––––––

So...that's the biological neural network.

----

What about the artificial neural network?

Note:
In many ways, it's the same. It consists of interconnected neurons, or nodes.

–––––––––––––––––––––––––––––––––––––––––––––––

And how does each network work, roughly?

----
1. Input received, converted
----
2. Input processed through successive layers
----
3. Output produced

Note:
In the biological network,
1.
Input is received and converted into a form that can be processed
  - chemical or electrical signal.
  help: a specific biological example. perhaps being touchéd, converted to eletrical signal?

2.
That input is processed through successive layers of neurons.
Each layer's output is the next layer's input.


help: biological examples between the initial touch and the conscious thought of being touchéd. would the subconscious layer be involved here or is that too slow for this sort of processing?

  The final intermediary layer might be the brain's subconscious processes, working behind the scenes to interpret and analyze information.

3.
The output is produced.
  Conscious thoughts or involuntary actions.

And the artificial neural network?
# go back to
1.
Input is received and converted into a series of numbers.

2.
These numbers are processed through successive layers of nodes.

3.
The output is produced.
  Conscious thoughts or involuntary actions.

–––––––––––––––––––––––––––––––––––––––––––––––

Okay. What's a Transformer?

Note: a transformer is a neural network, with the general architecture I just described. The difference between transformers and other text-centric neural networks is in how they process information in the intermediate layers.

–––––––––––––––––––––––––––––––––––––––––––––––
Chatbot example

Note:
let's walk through each step of the transformer model at a macro level, using the example of a chatbot powered by GPT-2, which was released in 2018.

----

"The quick brown fox"

Note:


----

input layer:

the input text is converted into numbers <!-- .element: class="fragment" data-fragment-index="1" -->

Note:

----

intermediate layer n<sup>0</sup>:

the numbers from the input layer are processed<!-- .element: class="fragment" data-fragment-index="1" -->

and fed to the subsequent layer, n<sup>1</sup> <!-- .element: class="fragment" data-fragment-index="2" -->


Note:
test

----

intermediate layer n<sup>1</sup>:

<span class="fragment" data-fragment-index="1"> the numbers from the prior intermediate layer are processed </span>

<span class="fragment" data-fragment-index="2"> and fed to the subsequent layer, n<sup>2</sup> </span>

Note:
test

----

and so on

Note:

----

output layer:

the numbers from the final intermediate layer are used to predict a word.<!-- .element: class="fragment" data-fragment-index="1" -->

Note:


We get an output of 1 word. In this case,

----


"jumps"

Note:
jumps.

----

<span class="fragment fade-in-then-semi-out" data-fragment-index="0"> The initial input  </span>
<span class="fragment fade-in-then-semi-out" data-fragment-index="2"> and the output  </span>

<span class="fragment" data-fragment-index="1"> "The quick brown fox"  </span>
<span class="fragment" data-fragment-index="3"> + "jumps"  </span>

<span class="fragment" data-fragment-index="4"> are fed back in.  </span>
Note:
Let's start high level.
"The quick brown fox".
----

repeat

----

"the quick brown fox"
<span class="fragment" data-fragment-index="1"> + </span>
<span class="fragment" data-fragment-index="2">"jumps</span>
<span class="fragment" data-fragment-index="3">over</span>
<span class="fragment" data-fragment-index="4">the</span>
<span class="fragment" data-fragment-index="5">lazy</span>
<span class="fragment" data-fragment-index="6">dog"</span>

Note:
Let's start high level.
"The quick brown fox".

input layer:
Each word gets converted to a series of numbers.


output layer:
   - The transformer predicts the most likely next word based on the processed input. Let's say it predicts "jumps".
   ----
   - The predicted word is added to the sequence: "The quick brown fox jumps".
   ----
   - The process repeats, with each new word influencing subsequent predictions.


–––––––––––––––––––––––––––––––––––––––––––––––

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

<div style="position: fixed; width: 100%; font-size: 0.4em">
  <a href="https://github.com/openai/gpt-2/blob/master/src/model.py">GPT-2 on Github</a>
</div>

Note:
  n_vocab=0
    this is the number of unique words in the dataset
    and determines the size of the input embeddings
    the number of tokens in the input sequence

  n_ctx=1024
    the maximum number of tokens in the context window
    determines the number of positions in the positional encoding

  n_embd=768
    the number of elements per embedding

  n_head=12
    the number of attention heads in each layer
    this is the number of times the model will split the input sequence
    and calculate attention weights

  n_layer=12
    the number of transformer layers
    this is the number of times the model will apply the transformer
    to the input sequence


–––––––––––––––––––––––––––––––––––––––––––––––


Let's go through that step by step.

–––––––––––––––––––––––––––––––––––––––––––––––



"The quick brown fox"

"The": [0.91, 0.28, 0.53] <!-- .element: class="fragment" data-fragment-index="0" -->

"quick": [0.24, 0.71, 0.67] <!-- .element: class="fragment" data-fragment-index="1" -->

"brown": [0.47, 0.18, 0.59] <!-- .element: class="fragment" data-fragment-index="2" -->

"fox": [0.87, 0.44, 0.30] <!-- .element: class="fragment" data-fragment-index="3" -->

Note:
   - The input is split into tokens: "The", "quick", "brown", "fox".
   ----
   - Each token is mapped to its corresponding embedding vector, which is just a fancy way of saying an array of numbers.

–––––––––––––––––––––––––––––––––––––––––––––––

{

  [0.91, 0.28, 0.53],

  [0.24, 0.71, 0.67],

  [0.47, 0.18, 0.59],

  [0.87, 0.44, 0.30]

}

Note: that leaves us with something like this:

–––––––––––––––––––––––––––––––––––––––––––––––


lotsOfMathSomeOfWhichIsVeryBasic([0.91, 0.28, 0.53])

lotsOfMathSomeOfWhichIsVeryBasic([0.24, 0.71, 0.67])<!-- .element: class="fragment" data-fragment-index="1" -->

lotsOfMathSomeOfWhichIsVeryBasic([0.47, 0.18, 0.59])<!-- .element: class="fragment" data-fragment-index="2" -->

lotsOfMathSomeOfWhichIsVeryBasic([0.87, 0.44, 0.30])<!-- .element: class="fragment" data-fragment-index="3" -->

note:
   - Each element in one array is evaluated against each element in every other array.

–––––––––––––––––––––––––––––––––––––––––––––––

[

  [0.13, 0.64, 0.82],

  [0.75, 0.39, 0.11],

  [0.95, 0.58, 0.26],

  [0.49, 0.92, 0.61]

]

–––––––––––––––––––––––––––––––––––––––––––––––

repeat for each intermediary layer

–––––––––––––––––––––––––––––––––––––––––––––––

predictionAlgorithm(lastIntermediateLayerOutputArray)

"jumps" <!-- .element: class="fragment" data-fragment-index="1" -->

Note:


–––––––––––––––––––––––––––––––––––––––––––––––

repeat

–––––––––––––––––––––––––––––––––––––––––––––––

a few more slides to go

–––––––––––––––––––––––––––––––––––––––––––––––

@keithgibson

–––––––––––––––––––––––––––––––––––––––––––––––
Text Generation Step 2

2. Self-Attention and Multi-Head Attention:
   - The embeddings pass through the self-attention mechanism.
   ----

   - Multiple attention heads analyze different aspects simultaneously.

–––––––––––––––––––––––––––––––––––––––––––––––
Text Generation Step 3

3. Feedforward Networks and Positional Encoding:
   - The output from the attention mechanisms is refined by feedforward networks.
   ----
   - Positional information is added to preserve the order of the tokens.

–––––––––––––––––––––––––––––––––––––––––––––––
Text Generation Step 4

4. Text Generation:


Tokenization and Embeddings

- Input text is broken down into tokens
----
- Each token is mapped to an embedding vector

–––––––––––––––––––––––––––––––––––––––––––––––
Self-Attention Mechanism (SAM)

- Core of transformer's parallel processing
----
- Each word is processed in context of every other word
----
- Like a conversation where you recall every word spoken

–––––––––––––––––––––––––––––––––––––––––––––––
Multi-Head Self-Attention

- Multiple attention "heads" per layer
----
- Each head focuses on different aspects of input
----
- Heads work in parallel to analyze input from different perspectives

–––––––––––––––––––––––––––––––––––––––––––––––
Feedforward Networks (FFNs)

- Additional layers of processing
----
- Each node's output from self-attention is independently transformed
----
- Similar to how brain regions refine sensory input

–––––––––––––––––––––––––––––––––––––––––––––––
Positional Encoding

- Adds information about word position
----
- Ensures model understands word order
----
- Crucial for meaning

–––––––––––––––––––––––––––––––––––––––––––––––
Transformer Outcomes

- Coherent and contextually appropriate text generation
----
- Engaging conversations
----
- Creative fiction writing

–––––––––––––––––––––––––––––––––––––––––––––––
Conclusion

- Explored neural networks and transformers
----
- Biological inspiration for artificial neural networks
----
- Transformer architecture and innovative components
----
- Text generation example showcasing transformers' capabilities

–––––––––––––––––––––––––––––––––––––––––––––––
Future Potential

- Drawing inspiration from human brain
--
- Transformers as a significant leap forward
--
- Pushing boundaries and exploring novel architectures
--
- Building models rivaling human complexity and creativity

–––––––––––––––––––––––––––––––––––––––––––––––

<!-- .slide: data-background-image="assets/sponsorSlide2end_dark_highres.png" -->

–––––––––––––––––––––––––––––––––––––––––––––––

Works Cited
